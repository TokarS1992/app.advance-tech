
import { NgModule } from '@angular/core';

import { DirectiveSmoothScroll } from './scrollSmooth/scrollSmooth';
import { DirectiveScrollTop } from './scrollTop/scrollTop';
import {DirectiveCallButton} from "./button/button";

@NgModule({
    declarations: [
        DirectiveSmoothScroll,
        DirectiveScrollTop,
        DirectiveCallButton,
    ],
    exports: [
        DirectiveSmoothScroll,
        DirectiveScrollTop,
        DirectiveCallButton
    ]
})
export class DirectiveModule {}
