// source: http://www.ravinderpayal.com/Simple-and-Light-Weight-Image-or-Content-Slider-for-Angular2/

import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'slider',
    template: require('./slider.component.html')
})
export class SliderComponent {
    @Input('config') config: any;
    @Input('slides') slides: any;
    @Input('initialize') initializeSwiper: boolean;
    @ViewChild("swiper") swiper: any;

    onPrev(event: any) {
        this.swiper.Swiper.onClickPrev(event);
    }

    onNext() {
        this.swiper.Swiper.onClickNext(event);
    }
}