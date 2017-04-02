import { Component, OnInit,AfterViewInit } from '@angular/core';
import { TitleService } from '../../services/title';
import 'rxjs/add/operator/map';

declare var $ : any;

@Component({
    selector: 'my-service',
    templateUrl: 'dist/html/services.component.html',
    providers: [TitleService]
})
export class ServiceComponent implements OnInit {

    name: string = 'Service';

    constructor(private title: TitleService) {}

    ngOnInit() {
        this.title.setTitle(this.name);
    }

}
