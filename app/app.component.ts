import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './services/http.service';
import 'rxjs/add/operator/map';

declare var $: any;
declare var ENV: string;

@Component({
    selector: 'my-app',
//     template: `
// <a [routerLink]="['/']">Home</a> | <a [routerLink]="['/about/', { id: 2 }]">About</a>`,
    templateUrl: './dist/html/main/main.component.html',
    providers: [HttpService],
    host: {
        '(document:scroll)': 'scrollToTop()'
    }
})

export class AppComponent implements OnInit {

    scrollCheck:boolean = false;

    categories: Categories;
    contacts: Object[] = [];
    col_number: number;

    nav_open: boolean = false;
    fix_height: boolean = false;

    @ViewChild("direct") activeNumbDirect:any;

    constructor(private httpService: HttpService) {}

    getContacts() {
        return this.contacts;
    }

    ngOnInit() {
        this.httpService.getData('/categories')
            .subscribe(( resp: Response ) => {
                let title_item = resp.json()[0];
                for(let index in title_item) {
                    let menu = title_item[index];
                    if ( typeof menu == 'object' ) {
                        this.categories = menu;
                    }
                }
            })

        this.httpService.getData('/contacts')
            .subscribe((resp: Response) => {
                this.contacts = resp.json()[0].contacts;
                if (this.contacts.mail) {
                    this.col_number = 6;
                } else {
                    this.col_number = 9;
                }
            })
    }

    toogleNavMenu() {
        this.fix_height = !this.fix_height;
        this.nav_open = !this.nav_open;
    }

    keys(obj: any): Array<string> {
        if (typeof obj !== 'undefined' || null) {
            return Object.keys(obj);
        }
    }

    clickOn(tab?:HTMLElement) {
        // console.log(tab.classList.contains("active_tab"));
        // if ( !tab.classList.contains("active_tab") ) {
        //     this.toogleNavMenu();
        // }
        this.toogleNavMenu();
    }

    scrollToTop() {
        let doc = document.body.scrollTop;
        if (doc >= this.activeNumbDirect.getNumberActive()) {
            this.scrollCheck = true;
        } else {
            this.scrollCheck = false;
        }
    }
}

interface GlobalEnvironment {
    ENV: string;
}

interface Categories {
    [index: string]: string;
}
