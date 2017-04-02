
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[scroll-to-top]',
    host: {
        '(click)':'toTop(0, 100, 10)'
    },
    exportAs: 'sctollToTop'
})

export class DirectiveScrollTop {

    @Input() numberActive:number;
    @Input() to:number;
    @Input() duration:number;

    constructor(private el:ElementRef) {}

    toTop(to:number = 0, duration:number, speed:number = 10) {
        
        if (document.body.scrollTop == to) return;

        const start = document.body.scrollTop;
        // const diff = to - start;
        // const scrollStep = Math.PI / (duration/10);
        let currPos:any = 0;
        let count = 0;

        let scrollInterval = setInterval(
            () => {
                if ( document.body.scrollTop !== to && currPos < document.documentElement.scrollHeight ) {
                    count++;
                    // currPos = start - (0.5 - 0.5 * Math.cos( count * scrollStep));
                    document.body.scrollTop = document.body.scrollTop - count/4;
                    // console.log( Math.cos( count * scrollStep) )
                } else {
                    clearInterval(scrollInterval);
                }
            }, speed
        );
    }

    getNumberActive() {
        return this.numberActive;
    }
}