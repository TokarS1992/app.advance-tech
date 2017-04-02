import { Component, ElementRef, OnInit, Inject,Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

declare var $: any;

// Model
import { Model_banners } from '../../../models/banners';

@Component({
    selector: 'my-jquery-slider',
    template: `
        <section class="slider">
            <h2 class="title_section"> {{ title_slider }} </h2>
            <div class="own-slider">
                <div class="slider-{{ i + 1 }}" *ngFor="let ban of banners; let i = index;">
                    <div class="image">
                        <img alt="" src="{{ ban.path }}"/>
                    </div>
                    <div class="content">
                        
                        <button *ngIf="i == 0 && button_form" (click)="navigateBy()" class="want_site btn">Хочу сайт</button>
                    </div>
                </div>
            </div>
        </section>
    `,
    providers: [HttpService]
})

export class JquerySlider implements OnInit {

    @Input() button_form: boolean;
    @Input() title_slider: string;

    title_section: string = 'Мы делаем уютные сайты';
    el_ref: ElementRef;
    banners: Model_banners[] = [];

    constructor(
        @Inject(ElementRef) el_ref: ElementRef,
            private httpService: HttpService,
            private _router: Router
        ) {
        this.el_ref = el_ref;
    }

    ngOnInit() {
        this.httpService.getData('./banners')
        .subscribe((res: Response) => {
            let banners = res.json();
            for(let ban in banners) {
                this.banners.push(new Model_banners(
                    banners[ban].description,
                    banners[ban].img_path
                ))
            }
        })

        setTimeout(() => {
            $('.own-slider')
                .owlCarousel({
                    autoPlay: 4000,
                    items: 1,
                    itemsDesktop: false,
                    itemsDesktopSmall: false,
                    itemsTablet: false,
                    itemsMobile: false,
                    slideSpeed: 400,
                    navigationText: ['', ''],
                    responsive: true,
                    navigation: false,
                    support3d: false
                });
        }, 500)
    }

    navigateBy() {
        this._router.navigateByUrl("home(modals:modal-callback)");
    }

}
