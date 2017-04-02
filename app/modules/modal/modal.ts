import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
    selector: 'modal-head',
    template: '<ng-content></ng-content>'
})
export class ModalHead {}

@Component({
    selector: 'modal-cont',
    template: '<ng-content></ng-content>'
})
export class ModalCont {}

@Component({
    selector: 'modal-foot',
    template: '<ng-content></ng-content>'
})
export class ModalFoot {}

@Component({
    selector: 'modal',
    templateUrl: './dist/html/modals_layout/modal.html'
})

export class Modal {

    @Input() modalClass: string;
    @Input() cancelBut: string;
    @Input() cancelClass: string;
    @Input() successBut: string;
    @Input()
    private routePath: string;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @ViewChild("modalCount")
    public modalCount: ElementRef;

    public showModal: boolean = false;
    public id_modal: string = pref_count_modal('modal_');

    constructor(private _route: Router){}

    ngOnInit() {
        this.open();
    }

    open() {
        if (this.showModal) return;
        this.showModal = true;
        setTimeout(() => {
            $(this.modalCount.nativeElement).addClass('in');
        })
    }

    close() {
        this.showModal = false;
        $(this.modalCount.nativeElement).removeClass('in').addClass('fade')
        setTimeout(() => {
          this._route.navigateByUrl(this.routePath);  
        },500)
    }
}

let modal_count = 0;

export function pref_count_modal(prefix: string):string {
    return prefix + modal_count++;
}

