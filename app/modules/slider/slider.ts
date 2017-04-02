import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Model_banners } from '../../models/banners';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'slider',
    templateUrl: 'dist/html/slider_layout/slider.html',
    providers: [HttpService]
})
export class Slider implements OnInit {

    elem: HTMLElement;

    @Input() modal_btn: boolean;
    @Input() navByModalPath: string[];

    // Path for content banners
    @Input() httpPath: string;

    // Checks autoPlay, support response
    @Input() autoPlay: any;
    @Input() checkResponse: boolean;

    @Input() support3d: boolean;

    // Base classes
    @Input() baseClass: string;
    @Input() themeClass: string;

    // Base slide presents
    @Input() items: number = 5; 

    // Devices config
    @Input() itemsDesktop: any = [1199, 4];
    @Input() itemsDesktopSmall: any = [979, 3];
    @Input() itemsTablet: any = [768, 2];
    @Input() itemsMobile: any = [479, 1];

    // Navigation
    @Input() navigation: boolean;
    @Input() pagination: boolean;
    @Input() paginationNumbers: any;

    // Speeds
    @Input() slideSpeed: number = 200;
    @Input() paginationSpeed: number = 800;
    @Input() goToFirstSlider: number = 1000;
    
    // Buttons text default
    @Input() textBut: string[] = ['prev','next'];

    @Input() onHoveredSlide: boolean;

    // Baners content
    banners: Model_banners[] = [];

    // Check touch event
    touchCheck: boolean;

    gotToFirst: boolean = true;

    // Default width main blocks
    wrapWidth: number = 0;

    // Check this slide
    currentSlide: number = 0;

    // Select all slide-item
    wrapChild: any;

    // Select length slide-item mas
    wrapChildLength: number;

    playDirection: string = "next";

    // One start. After checkStartUp = false
    checkStartUp: boolean = true;

    // Check Css animate
    isCssFinishAnimate: boolean;
    
    // Check add class clickable for navigate
    checkClickableClass: boolean;

    // Check active pagination
    checkActivePag: boolean;
    
    // Default sliders
    originalItems: number = this.items;
    itemWidth: number;
    positionInArray: number[];

    // Check max sliders
    maxSlide: number;
    
    maximumPixels: number;
    
    masNumber: number[] = [];
    
    // Animate interval
    intervalAnimate: any;

    interval: any;

    checkIndexPag: Object = {};

    @ViewChild("checkBuild") checkBuild: HTMLElement;
    @ViewChild("checkPag") checkPag: HTMLElement;

    constructor(
        private el: ElementRef,
        private httpService: HttpService,
        private router: Router
    ) {}

    ngOnInit() {
        let self = this;
         self.httpService.getData(this.httpPath)
            .subscribe((res: Response) => {
                let banners = res.json();
                for(let ban in banners) {
                    this.banners.push(new Model_banners(
                        banners[ban].description,
                        banners[ban].img_path
                    ))
                }
            })

        if ( self.baseClass || self.themeClass) {
           self._baseClass();
        }

        let build = setInterval(
            () => {
                if ( self.checkBuild ) {
                    self.checkTouch();
            
                    // Support 3D
                    self.supp3D();
            
                    self.updateVars();

                    clearInterval(build);
                }
            }
        )
    }

    ngOnDestroy() {

    }

    navigateBy(navigateBy: string[]) {
        this.router.navigateByUrl(navigateBy[0] + "(modals:" + navigateBy[1] + ")" );
    }
    
    _baseClass() {
        let self = this;
        let main: HTMLElement = self.el.nativeElement.querySelector(".slider-main");

        if (self.baseClass && self.themeClass) {
            main.classList.add(self.baseClass);
            main.classList.add(self.themeClass);
        } else if ( self.baseClass ) {
            main.classList.add(self.baseClass);
        } else {
            main.classList.add(self.themeClass);
        }
    }

    checkTouch() {
        let self = this;
        if ( "ontouchstart" in document.documentElement ) {
            self.touchCheck = true;
        } else {
            self.touchCheck = false;
        }
    }

    // Func support 3D
    supp3D() {

    }

    updateVars() {
        let self = this;

        if ( self.checkResponse ) {
            self.updateSize();
        }
        
        self.calculateAll();

        if ( self.checkStartUp == true ) {
            self.checkControl();

            self.playNow();
            self.checkStartUp = false;
        }

        self.checkPagination();
    }
    
    checkControl() {
        let self = this;

        if ( self.checkTouch ) {
            self.checkClickableClass = true;
        }

        if ( self.pagination) {
            if ( self.paginationNumbers) {
                for(let i = 0; i < self.wrapChildLength; i++) {
                    self.masNumber.push(i + 1);
                }
            }
            self.checkPagination();
        }

        if ( self.navigation) {
            self.checkNavigation();
        }
    }

    checkPagination() {
        let self = this;
        let buildPag = setInterval(
            () => {
                if ( self.checkPag ) {
                    let pagination = self.el.nativeElement.querySelectorAll(".pagination-item");
                    let pag_position: HTMLElement = self.el.nativeElement.querySelector(".slider-pagination");

                    // if (pag_position.style.left == "50%" || pag_position.style.right == "50%") {
                        pag_position.style.marginLeft = -(pag_position.offsetWidth)/2 + "";
                    // }
                    try {
                        pagination.forEach(
                            (el: HTMLElement, i: number) => {
                                if ( i == self.currentSlide ) {
                                    pagination.forEach(
                                        (elem: HTMLElement) => {
                                            if ( elem.classList.contains("active") ) elem.classList.remove("active");
                                        }
                                    )
                                    el.classList.add("active");
                                    throw self.checkIndexPag;
                                }
                            }
                        )
                    } catch (e) {
                        if ( e !== self.checkIndexPag ) throw e;
                    }
                    clearInterval(buildPag);
                }
            }
        )
    }
    
    checkNavigation() {
        let self = this;
        let navigateBut: any = self.el.nativeElement.querySelectorAll(".slider-buttons > div");

        navigateBut.forEach(
            (el: HTMLElement) => {
                el.addEventListener( self.getEvent(), (e: Event) => {
                    e.preventDefault();
                }, false)
                el.style.marginTop = -(el.offsetHeight)/2 + "";
            }
        )
    }

    getEvent() {
        let self = this;
        if ( self.touchCheck ) {
            return "touchstart";
        } else {
            return "click";
        }   
    }

    updateSize() {
        let self = this;
        let docWidth = window.innerWidth;

        if ( docWidth < ( self.itemsDesktop[0] || self.originalItems ) ) {
            self.items = self.originalItems;
        }
        if ( docWidth < self.itemsDesktop[0] && self.itemsDesktop !== false ) {
            self.items = self.itemsDesktop[1];
        }
        if ( docWidth < self.itemsDesktopSmall[0] && self.itemsDesktopSmall !== false ) {
            self.items = self.itemsDesktopSmall[1];
        }
        if ( docWidth < self.itemsTablet[0] && self.itemsTablet !== false ) {
            self.items = self.itemsTablet[1];
        }
        if ( docWidth < self.itemsMobile[0] && self.itemsMobile !== false ) {
            self.items = self.itemsMobile[1];
        }
    }

    calculateAll() {
        let self = this;
        self.calculateWidth();
        self.appendItemsSizes();
        self.appendWrapperSizes();
        self.checkLoops();
        self.max();
    }

    calculateWidth() {
        let self = this;
        self.itemWidth = Math.round( self.el.nativeElement.querySelector(".slider-main").offsetWidth / self.items );
    }

    appendItemsSizes() {
        let self = this;
        let roundPages = 0;

        self.wrapChild = this.el.nativeElement.querySelectorAll("div.slide-item");
        self.wrapChildLength = self.wrapChild.length;

        let lastItem = self.wrapChildLength - self.items;
        self.wrapChild.forEach(
            (elem: HTMLElement, i: number) => {
                elem.style.width = self.itemWidth + "px";
                elem.setAttribute("data-slide-item", Number(i) + "");

                if (i % self.items == 0 || i == lastItem ) {
                    if ( !(i > lastItem) ) {
                        roundPages += 1;
                    }
                }

                elem.setAttribute("data-roundPage", roundPages + "");
                self.wrapWidth += self.itemWidth;
            }
        )
    }

    appendWrapperSizes() {
        let self = this;
        self.el.nativeElement.querySelector(".slider-wrapper").style.width = self.wrapWidth + "px";
        self.el.nativeElement.querySelector(".slider-wrapper").style.left = 0 + "px";
    }

    checkLoops(){
        let self = this;
        let elWidth: number = 0;
        self.positionInArray = [0];

        for(var i = 0; i <= self.wrapChildLength; i++) {
            elWidth += self.itemWidth;
            self.positionInArray.push(-elWidth);
        }
    }

    max() {
        let self = this;
        self.maxSlide = self.wrapChildLength - self.items;
        let maximum = ( self.wrapChildLength * self.itemWidth ) - self.items * self.itemWidth;
        maximum = maximum * -1;
        self.maximumPixels = maximum;
        return maximum;
    }

    clickToPag(e: Event, i: number) {
        let self = this;
        let elemNumb: any = e.srcElement.getAttribute("data-pos");
        if ( +elemNumb !== self.currentSlide ) {
            self.goToNextSlide(+elemNumb, true);
        }
    }

    next( speed?: any) {
        let self = this;
        self.currentSlide += 1;
        if ( self.currentSlide > self.maxSlide ) {
            self.currentSlide = self.maxSlide;
            return false;
        }
        self.goToNextSlide( self.currentSlide, speed );
    }

    prev( speed?: any) {
        event.preventDefault();
        let self = this;
        self.currentSlide -= 1;
        if ( self.currentSlide < 0 ) {
            self.currentSlide = 0;
            return false;
        }
        self.goToNextSlide( self.currentSlide, speed );
    }

    goToNextSlide(position: number, pagination: any) {
        let self = this;
        if ( position >= self.maxSlide ) {
            position = self.maxSlide;
        } else if ( position < 0 ) {
            position = 0;
        }
        self.currentSlide = position;

        let gotToPixel = self.positionInArray[position];

        if (self.support3d == true) {
            // Support for 3D
        } else {
            if ( pagination == true ) {
                self.css2slide(gotToPixel, +self.paginationSpeed);
            } else if ( pagination == "goToFirst" ) {
                 self.css2slide(gotToPixel, +self.goToFirstSlider);   
            } else {
                self.css2slide(gotToPixel, +self.slideSpeed);
            }
        }

        if ( self.pagination) {
            self.checkPagination();
        }
        
        // Run autoplay
        if ( self.autoPlay) {
            self.playNow();
        }
    }
    
    css2slide(val: number, speed?: number) {
        let self = this;

        let duration = speed !== undefined ? speed : self.slideSpeed;
        self.isCssFinishAnimate = false;

        let thisElement = self.el.nativeElement.querySelector(".slider-wrapper");
        
        clearInterval( self.intervalAnimate );
        self.animate( thisElement, {
            "left": val
        }, duration, function(){ self.isCssFinishAnimate == true });
    }
    
    playNow() {
        let self = this;

        if ( self.autoPlay == false ) return false;

        clearInterval( self.interval );
        self.interval = setInterval(() => {
            if ( self.currentSlide < self.maxSlide && self.playDirection == "next" ) {
                self.next(true);
            } else if ( self.currentSlide == self.maxSlide ) {
                if ( self.gotToFirst ) {
                    self.goToNextSlide(0, "goToFirst");
                } else {
                    self.playDirection = "prev";
                    self.prev(true);
                }
            } else if ( self.playDirection == "prev" && self.currentSlide > 0 ) {
                self.prev(true);
            } else if ( self.playDirection == "prev" && self.currentSlide == 0 ) {
                self.playDirection = "next";
                self.next(true);
            }
        }, self.autoPlay)
    }

    animate(el: HTMLElement, properties: Object, duration?: number, callback?: Function) {
        let self = this;
        let count: number = 1;

        if ( duration == null ) {
            let duration = 500;
        }

        for( let key in properties) {
            let prop: string = el.style[key]; 
                prop = prop.replace('px','');

            let currentProp: number = +prop;
            let val = properties[key];
            self.intervalAnimate = setInterval(() => {

                let steps = (count * duration)/1000*0.7;
                let currentPos = +el.style[key].replace('px','');

                if ( currentProp !== val ) {
                    if ( currentProp < val ) {
                        if ( currentPos + steps > val ) {
                            currentProp = val;
                            el.style[key] = val;
                        } else {
                            el.style[key] = currentPos + steps;
                        }
                    } else {
                        if ( currentPos - steps < val ) {
                            currentProp = val;
                            el.style[key] = val;
                        } else {
                            el.style[key] = currentPos - steps;
                        }
                    }
                    count++;
                } else {
                    clearInterval(self.intervalAnimate);
                }
            }, 10);
        }
        callback.call(() => {
            console.log(self.isCssFinishAnimate);
        })
    }

    stopAnimate() {
        let self = this;
        clearInterval(self.intervalAnimate);
    }

    stopAutoplay() { 
        let self = this;
        if ( self.onHoveredSlide ) clearInterval( self.interval );
    }

    startautoplay() {
        let self = this;
        if ( self.onHoveredSlide ) self.playNow();
    }

    dragStart(e: Event) {
        e.preventDefault();
    }
    
}
