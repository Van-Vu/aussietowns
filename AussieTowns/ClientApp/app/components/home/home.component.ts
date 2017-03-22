import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../services/user.service';

import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent implements AfterViewChecked{
    @ViewChild("fileInput") fileInput;

    //The time to show the next photo
    private NextPhotoInterval: number = 5000;
    //Looping or not
    private noLoopSlides: boolean = true;
    //Photos
    private slides: any[] = [];
    initializeSwiper: boolean = false;

    //config: Object = {
    //    pagination: '.swiper-pagination',
    //    paginationClickable: true,
    //    nextButton: '.swiper-button-next',
    //    prevButton: '.swiper-button-prev',
    //    spaceBetween: 30
    //};

    config: Object = {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    };

    constructor(private userService: UserService) {
        this.addNewSlide();
    }

    ngAfterViewChecked() {
        if (isBrowser) {
            this.initializeSwiper = true;
        }
    }

    private addNewSlide() {
        this.slides.push(
            { index:1, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' },
            { index:2, image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg', text: 'BMW 3' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg', text: 'BMW 4' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg', text: 'BMW 5' },
            //{ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg', text: 'BMW 6' }
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }

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
