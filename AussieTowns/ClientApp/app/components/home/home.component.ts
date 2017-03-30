import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import { isBrowser } from 'angular2-universal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

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
    initializeRequestSlide: boolean = false;

    //config: Object = {
    //    pagination: '.swiper-pagination',
    //    paginationClickable: true,
    //    nextButton: '.swiper-button-next',
    //    prevButton: '.swiper-button-prev',
    //    spaceBetween: 30
    //};

    //images: Array<any> = [{ "sType": "img", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" }, { "sType": "div", "content": "...Hello It's slidable content" }];

    requestSlides: Array<any> = [
        { "text": "slide conten asdfa sdfasfd asdf asdf asdf as dfasd", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "slide conten", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" }
    ];

    requestConfig: Object = {
        direction: 'horizontal',
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        controlBy: 'container'
    };

    constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
        this.addNewSlide();
    }

    model: FormGroup;
    ngOnInit() {
        this.model = this.fb.group({
            test: ['']
        });

        this.model.controls['test'].setValue({id:'123',name:'Bodom'});
    }
    onTest(model) {
        console.log(model.value);
        this.router.navigate(['search']);
    }

    ngAfterViewChecked() {
        if (isBrowser) {
            this.initializeRequestSlide = true;
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
