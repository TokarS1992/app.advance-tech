// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// This Module's Components
import { Slider } from './slider';
import { SliderMain } from '../../sliders/sliderMain';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Slider,
        SliderMain
    ],
    exports: [
        Slider,
        SliderMain
    ]
})
export class SliderModule {}
