import { Directive, ElementRef, OnInit, HostBinding, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { NativeWindowService } from '../../services/nativeWindow';

@Directive({
    selector: '[scrollSmooth]',
    host: {
        '(document:scroll)': 'myScroll()',
        '(document:resize)': 'myScroll()'
    },
    providers: [NativeWindowService]
})
export class DirectiveSmoothScroll implements OnInit {

    elem: HTMLElement;

    @HostBinding("class.off-top") statusClass_top: boolean = false;
    @HostBinding("class.off-bottom") statusClass_bottom: boolean = false;
    @HostBinding("class.already-visible") statusClass_already: boolean = false;
    @HostBinding("class.come-in") statusClass_come: boolean = false;

    constructor(
        private el: ElementRef,
        private win: NativeWindowService,
        @Inject(DOCUMENT) private doc: Document)
    {}

    ngOnInit() {
        if ( !this.scrollFunc(150).bottom ) {
            this.statusClass_already = true;
        }
    }

    scrollFunc(distance:number):any {

        let self = this.el.nativeElement;
        let win = this.doc.body;
        let viewTop = win.scrollTop;
        let viewBottom = viewTop + win.clientHeight;

        let _top = self.offsetTop - distance;
        let _bottom = self.offsetTop + self.clientHeight + distance;

        return {
            top: _bottom <= viewTop,
            bottom: _top >= viewBottom
        }
    }

    myScroll() {

        if ( !this.scrollFunc(150).top && !this.scrollFunc(150).bottom ) {
            this.statusClass_top = false;
            this.statusClass_bottom = false;
            this.statusClass_already = false;
            this.statusClass_come = true;
        } else {
            if (this.scrollFunc(150).top) {
                this.statusClass_top = true;
            } else {
                this.statusClass_bottom = true;
            }
        }

    }
}
