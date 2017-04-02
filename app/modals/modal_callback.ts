import {Component, ElementRef} from '@angular/core';
import { NgModel } from '@angular/forms';

import { Router } from '@angular/router';
import {HttpService} from "../services/http.service";

@Component({
    selector: 'modal-callback',
    templateUrl: 'dist/html/modals/modal_callback.html'
})

export class ModalCallback {

    constructor(
        private _route: Router
    ){}

    redirectBy() {
        this._route.navigateByUrl('/');
    }

}
