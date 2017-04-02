
import { Component } from '@angular/core';

@Component({
    selector: 'slider-main',
    template: `
        <slider
            [modal_btn]=true
            httpPath="./banners"
            [navByModalPath]="['home','modal-callback']"
            baseClass="sliderHome"
            themeClass="sliderTheme"
            [checkResponse]=true

            [itemsDesktop]=false
            [itemsDesktopSmall]=false
            [itemsTablet]=false
            [itemsMobile]=false

            [items]=1
            [navigation]=true
            [pagination]=true
            [paginationNumbers]=false
            [onHoveredSlide]=true

            [support3d]=false
            [textBut]="['пред','след']"

            [autoPlay]=4000
            >
        </slider>
    `
})

export class SliderMain {}