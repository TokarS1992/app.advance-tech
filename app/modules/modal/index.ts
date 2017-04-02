
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Modal, ModalHead, ModalCont, ModalFoot } from './modal';
import { ModalCallback } from '../../modals/modal_callback';

export * from './modal';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    exports: [
        Modal,
        ModalFoot,
        ModalHead,
        ModalCont,
        ModalCallback
    ],
    declarations: [
        Modal,
        ModalFoot,
        ModalHead,
        ModalCont,
        ModalCallback
    ]
})

export class ModalModule {}