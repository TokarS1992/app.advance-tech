import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../../../services/http.service';
import { Model_portfolio } from '../../../models/portfolio';

import 'rxjs/add/operator/map';

declare var $: any;

// Tabs Component
@Component({
    selector: 'tabs-port',
    template: `
        <div class="port_tabs">
            <ul *ngIf="tabs">
                <li [class.active_tab]="t.active" class="types__item" *ngFor="let t of tabs" [attr.data-type]="t[1]" (click)="selectTab(t)">{{ t[0] }}</li>
            </ul>
        </div>
    `
})
export class Tabs implements OnInit {
    active_tab: boolean = true;
    tabs = [
        ["Все","all"],
        ["Сайты", "site"],
        ["Мобильные приложения", "mobile"],
        ["Логотипы", "logos"]
    ];

    ngOnInit() {
        this.tabs[0].active = true;
        $.getScript('js/jquery/tabs.js');
    }

    selectTab(tab: any) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true;
    }

    addTab(tab: any) {
        if (this.tabs.length == 0) {
            tab.active = true;
        }
        this.tabs.push(tab);
    }
}
// END Tabs Component

// Portfolio View Compoenent
@Component({
    selector: 'my-jquery-portfolio',
    templateUrl: 'dist/html/jquery-scroll.component.html',
    providers: [HttpService]
})
export class JqueryElement implements OnInit {
    portfolio: Model_portfolio[] = [];

    constructor(private el_ref: ElementRef, private httpService: HttpService) {}

    ngOnInit() {
        this.httpService.getData('/service')
        .subscribe((resp: Response ) => {
            let port = resp.json();
            for(let item in port) {
                let one_port = port[item];
                this.portfolio.push( new Model_portfolio(
                    one_port.name,
                    one_port.description,
                    one_port.img_path,
                    one_port.type,
                    one_port.href
                    )
                )
            }
        })
    }

}
// END Portfolio Component
