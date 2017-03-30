import { Component } from '@angular/core';

@Component({
    selector: 'modalframe',
    template: require('./modalframe.component.html'),
    styles: [require('./modalframe.component.css')]
})

export class ModalFrameComponent {

    public visible = false;
    private visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}