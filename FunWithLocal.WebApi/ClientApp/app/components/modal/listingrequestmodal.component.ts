import { Component, ViewChild } from '@angular/core';

import { ModalFrameComponent } from './modalframe.component';

@Component({
    selector: 'listingrequestmodal',
    template: require('./listingrequestmodal.component.html')
})

export class ListingRequestModalComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    public show(): void {
        this.modal.show();
    }
}
