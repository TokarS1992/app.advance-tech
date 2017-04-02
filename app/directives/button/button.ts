/**
 * Created by serge on 25.02.2017.
 */

import {Directive, Input, ElementRef, Inject} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Directive({
  selector: '[callbutton]',
  host: {
    '(click)':'nagivateBy()'
  },
  exportAs: 'callbut'
})

export class DirectiveCallButton {
  el_ref: ElementRef;
  constructor(
    @Inject(ElementRef) el_ref: ElementRef,
    private httpService: HttpService,
    private _router: Router
  ) {
    this.el_ref = el_ref;
  }

  navigateBy() {
    this._router.navigateByUrl("home(modals:modal-callback)");
  }
}
