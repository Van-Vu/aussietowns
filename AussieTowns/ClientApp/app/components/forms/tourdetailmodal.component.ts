import { Component, ViewChild } from '@angular/core';

import { ModalFrameComponent } from './modalframe.component';

@Component({
    selector: 'tourdetailmodal',
    template: require('./tourdetailmodal.component.html')
})

export class TourDetailModalComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    public show(): void {
        this.modal.show();
    }
}