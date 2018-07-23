import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

// Services
import { HttpService } from '../../services/http.service';
import { TitleService } from '../../services/title';
import 'rxjs/add/operator/map';

@Component({
    selector: 'my-home',
    templateUrl: 'dist/html/home.component.html',
    providers: [HttpService, TitleService]
})

// <h2 class="title_section">Мы делаем уютные сайты</h2>
// <slider-main></slider-main>

export class HomeComponent implements OnInit {

    name: string = 'Home';

    constructor(private title: TitleService) {}

    ngOnInit() {
        this.title.setTitle(this.name);
    }
}