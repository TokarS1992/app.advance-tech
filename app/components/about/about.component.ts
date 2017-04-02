import {Component, OnInit, AfterViewInit,ElementRef} from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../services/title';
import {HttpService} from "../../services/http.service";

declare var $ : any;

@Component({
    selector: 'my-about',
    templateUrl: 'dist/html/about.component.html',
    providers: [TitleService,HttpService]
})
export class AboutComponent implements OnInit {
    name: string = "About Us";
    param: string;
    about: Object[] = [];

    constructor(private params: ActivatedRoute, private title: TitleService, private httpService: HttpService) {
        params.params
            .subscribe((data: { id?: string}) => this.param = data.id);
    }

    ngOnInit() {
        this.title.setTitle(this.name);

        this.httpService.getData('about_us')
        .subscribe((resp: Response ) => {
            let _about = resp.json();
            this.about = _about;
        })
    }
    ngAfterViewInit(){}
}


