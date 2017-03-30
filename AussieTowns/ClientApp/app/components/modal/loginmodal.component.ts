import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalFrameComponent } from './modalframe.component';

@Component({
    selector: 'loginmodal',
    template: require('./loginmodal.component.html')
})

export class LoginModalComponent {
    @ViewChild(ModalFrameComponent) modal: ModalFrameComponent;
    @Output() isLoggedIn = new EventEmitter<any>();

    handleLoggedIn(loggedInfo) {
        this.isLoggedIn.emit(loggedInfo);
        this.modal.hide();
    }

    public show(): void {
        this.modal.show();
    }
}
