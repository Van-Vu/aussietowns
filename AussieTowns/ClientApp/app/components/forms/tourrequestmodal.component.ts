import { Component, ViewChild } from '@angular/core';

import { ModalFrameComponent } from './modalframe.component';

@Component({
    selector: 'tourrequestmodal',
    template: require('./tourrequestmodal.component.html')
})

export class TourRequestModalComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    public show(): void {
        this.modal.show();
    }
}
