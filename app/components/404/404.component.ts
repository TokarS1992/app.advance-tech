import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title';

@Component ({
    selector: 'app404',
    templateUrl: 'dist/html/404.component.html',
    providers: [TitleService]
})

export class App404 implements OnInit {

    constructor(private title: TitleService){}

    ngOnInit() {
        this.title.setTitle('Page not found');
    }

}