import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('../../../asset/sass/base.scss').toString()]
})
export class AppComponent {

    constructor( @Inject(DOCUMENT) private document: any) { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        //let number = this.document.body.scrollTop;
        //console.log(`number ${number}`);
    }


    @HostListener('document:keyup', ['$event'])
    onKeyUp(ev: any) {
        // do something meaningful with it
        //console.log(`The user just pressed ${ev.key}!`);
    }

    @HostListener('document:dragover', ['$event'])
    onDragover(event: any) {
        // do something meaningful with it
        //console.log("drag Over");

        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    @HostListener('document:drop', ['$event'])
    onDrop(event: any) {
        // do something meaningful with it
        //console.log("Drop");

        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById('dragme');
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }
}
