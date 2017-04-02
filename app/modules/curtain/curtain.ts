
import { Component, Inject, ElementRef, Input, HostListener } from '@angular/core';

@Component({
    selector: 'curtain',
    template: '<ng-content select="curtain-cont"></ng-content>'
})
export class Curtain {}


@Component({
    selector: 'curtain-cont',
    template: '<ng-content></ng-content>',
    host: {
        '(document:scroll)': 'scrollCurtain()',
        '(document:resize)': 'setDimensions()'
    }
})

export class CurtainCont {

    elemData: Object[] = [];
    currentClass: HTMLElement;
    fixedClass: any;
    fixedLength: number;
    stepClass: any;
    stepLength: number;
    currentIndex: number;
    currentP: any;
    currentHeight: any;
    
    check: Object = {};
    checkMobile: boolean = window.innerHeight < 560 ? true : false;
    webkit: boolean = (window.navigator.userAgent.indexOf("Chrome") > -1 || window.navigator.userAgent.indexOf("Safari") > -1);

    checkOpas: boolean;

    // @Input() checkMobile: boolean;

    constructor(
        private el: ElementRef
    ){ }

    // Initialize
    ngOnInit() {
        
        if ( this.el.nativeElement.querySelectorAll(".opas").length > 0 ) {
            this.checkOpas = true;
        }

        this.setStyleSect();

        // AddClass for first element
        let first: HTMLElement = this.el.nativeElement.querySelectorAll('div.curtain-item')[0];
        first.classList.add('current');

        this.setCache();
    }

    scrollCurtain() {
        let doc = document.body.scrollTop;
        let allElem:any = this.el.nativeElement.querySelectorAll('div.curtain-item');
        let opasCoef: number = 0;
        let elemOpas: HTMLElement;

        if (doc < this.currentP && this.currentIndex > 0) {

            allElem.forEach(
                (el:HTMLElement) => {
                    if (!el.classList.contains("current")) {
                        el.classList.add("hidden");
                    }
                }
            )

            allElem[this.currentIndex - 1].classList.remove("hidden");
            allElem[this.currentIndex - 1].classList.add("current");

            this.currentClass.classList.remove("current");

            if (this.webkit) {
                this.currentClass.style.transform = "translateY(0) translateZ(0)";
            } else {
                this.currentClass.style.marginTop = 0 + "px";
            }

            this.setCache();
            this.prevSlide();

        } else if (doc < (this.currentP + this.currentHeight) ) {

            if (this.webkit) {
                this.currentClass.style.transform = "translateY(" + (-(doc - this.currentP)) + "px) translateZ(0)";
            } else {
                this.currentClass.style.marginTop = ( -(doc - this.currentP)) + "px";
            }

            if ( this.fixedLength ) {

            }

            if ( this.stepLength ) {

            }
            
            if (this.checkOpas) {
                elemOpas = this.el.nativeElement.querySelector(".current").nextElementSibling;
    
                if ( doc/window.innerHeight < 1 ) {
                    opasCoef = 1 - doc/window.innerHeight;
                } else {
                    let eps = Math.ceil(doc/window.innerHeight);
                    eps = eps % 2 == 0 ? eps - 1 : eps - 1;
                    opasCoef = 1 - (doc - (window.innerHeight)*eps)/1000;
                }
                
                elemOpas.style.display = "block";
                elemOpas.style.backgroundColor = 'rgba(0,0,0,'+ opasCoef +')';
            }

        } else {

            this.currentClass.classList.remove("current");
            this.currentClass.classList.add("hidden");

            allElem[this.currentIndex + 1].classList.add("current");


            if ( this.currentIndex + 2 < allElem.length) {
                allElem[this.currentIndex + 2].classList.remove("hidden");
            }

            if ( this.checkOpas ) {
                elemOpas = this.el.nativeElement.querySelector(".current").previousElementSibling;
                elemOpas.style.backgroundColor = "rgba(0,0,0,0)";
                elemOpas.style.display = "none";
            }
            this.setCache();
            this.nextSlide();

            opasCoef = 0;
        }
    }
    
    scrollCurtainMobile() {
        let doc = document.body.scrollTop;
        let allElem:any = this.el.nativeElement.querySelectorAll('div.curtain-item');

        if ( doc + 10 < this.currentP && this.currentIndex > 0 ) {

            this.currentClass.classList.remove('current');
            allElem[this.currentIndex  - 1].classList.add("current");
            this.setCache();
            this.prevSlide();

        } else if ( doc + 10 < ( this.currentP + this.currentHeight ) ) {
            if (this.stepLength) {
                this.stepClass.forEach(
                    (el:HTMLElement, i:number) => {
                        if ( ( el.offsetTop + this.currentP ) <= doc && ( el.offsetTop + this.currentP + el.offsetHeight ) >= doc ) {
                            if ( !el.classList.contains("current-step") ) {
                                this.stepClass[i].classList.remove("current-step");
                                el.classList.add("current-step");
                            }
                        }
                    }
                )
            }
        } else {
            this.currentClass.classList.remove('current');
            allElem[this.currentIndex  - 1].classList.add("current");
            this.setCache();
            this.nextSlide();
        }
    }

    // Set height and z-index elems
    setStyleSect() {

        let winHeight:number = this.getWindow();
        let count:number = 0;
        let levelHeight:any = 0;
        let height:any;
        let zIndex:number = 100;
        let allElem: any = this.el.nativeElement.querySelectorAll('div.curtain-item');
        let isOpasNext: boolean;

        allElem.forEach(
            (elem:HTMLElement) => {
                let isclassCov = elem.classList.contains("cover");
                zIndex -= count;

                if (isclassCov) {
                    height = winHeight;
                    elem.setAttribute("style","height:" + height + "px; z-index:" + zIndex);
                    elem.setAttribute("data-height", height );
                    elem.setAttribute("data-pos", levelHeight);

                    this.elemData.push({
                        "data-height": parseInt(height, 10),
                        "data-pos": parseInt(levelHeight, 10)
                    })
                    levelHeight += winHeight;
                } else {
                    height = ( elem.offsetHeight <= winHeight ) ? winHeight : elem.offsetHeight;

                    elem.setAttribute("style", "min-height:" + height + "px");
                    elem.setAttribute("data-height", height);
                    elem.setAttribute("data-pos", levelHeight);
                    elem.style.zIndex = zIndex + '';

                    if (elem.nextElementSibling !== null) {
                        isOpasNext = elem.nextElementSibling.classList.contains("opas");
                    }

                    if ( isOpasNext ) {
                        zIndex--;
                        elem.nextElementSibling.setAttribute("style", "z-index:" + zIndex);
                    }

                    this.elemData.push({
                        "data-height": parseInt(height, 10),
                        "data-pos": parseInt(levelHeight, 10)
                    })
                    levelHeight += height;
                }
                count++;
            }
        )
        let computedStyle = getComputedStyle(document.body.querySelector("main"));
        let mainPadTop:string = computedStyle.paddingTop == "0px" ? computedStyle.marginTop : computedStyle.paddingTop;
        mainPadTop = mainPadTop.replace("px","");
        let numberPad:number = +mainPadTop;

        let main_comp: any = this.el.nativeElement.querySelector('.curtain-main');
        main_comp.style.height = this.elemData[allElem.length - 1]["data-pos"] + winHeight - numberPad;
        
    }

    setCache() {
        this.currentClass = this.el.nativeElement.querySelector('.current');
        this.fixedClass = this.el.nativeElement.querySelectorAll('.fixed');
        this.fixedLength = this.fixedClass.length;
        this.stepClass = this.el.nativeElement.querySelectorAll('.step');
        this.stepLength = this.stepClass.length;

        let indexOf = this.el.nativeElement.querySelectorAll('.curtain-item');
        // let check:Object = {};

        // Поиск элемента с классом current и задавание индекса
        this.getIndex(indexOf);
        this.currentP = this.elemData[this.currentIndex]["data-pos"];
        this.currentHeight = this.elemData[this.currentIndex]["data-height"];

        // Next parallax
    }

    getWindow() {
        return window.innerHeight;
    }

    getIndex(elem?:any) {
        try {
            elem.forEach(
                (el:HTMLElement, i:number) => {
                    if (el.classList.contains("current")) {
                        this.currentIndex = i;
                        throw this.check
                    }
                }
            )
        } catch (e) {
            if (e !== this.check) throw e; 
        }
    }

    nextSlide() {
        console.log( "Current slide on next section" );
    }
    prevSlide() {
        console.log( "Current slide return on prev slide back" )
    }
}