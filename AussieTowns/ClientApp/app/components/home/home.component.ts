import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent {
    @ViewChild("fileInput") fileInput;

    constructor(private userService: UserService) { }

    addFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.userService
                .upload(fileToUpload)
                .subscribe(res => {
                    console.log(res);
                });
        }
    }

    src: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    selected(imageResult: ImageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    }
}
