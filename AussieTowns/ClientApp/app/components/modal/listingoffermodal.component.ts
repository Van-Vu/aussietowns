import { Component, ViewChild } from '@angular/core';

import { ModalFrameComponent } from './modalframe.component';

@Component({
    selector: 'listingoffermodal',
    template: require('./listingoffermodal.component.html')
})

export class ListingOfferModalComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;

    public show(): void {
        this.modal.show();
    }
}