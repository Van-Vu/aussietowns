import { Component, Input, OnChanges, } from '@angular/core';
import { SearchService } from '../../services/search.service'
import { Utils } from '../../shared/utils';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'listingoffercard',
    template: require('./listingoffercard.component.html')
})

export class ListingOfferCardComponent {
    @Input("Id") tourId: any;
    @Input("listing-detail") listingDetail: any;
    id:number;
    location: string;
    hostName: string;
    header: string;
    cost: string;
    date: string;
    time: string;
    description: string;

    slides: Array<any> = [
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" }
    ];

    config: Object = {
        direction: 'horizontal',
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        loop: true
    };
    initializeSlide:boolean = false;

    ngOnInit() {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.hostName = this.listingDetail.primaryOwner;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.date = Utils.getDate(this.listingDetail.schedules[0].startDate);
        this.time = Utils.getTime(this.listingDetail.schedules[0].startDate);
        this.description = this.listingDetail.description;
        if (isBrowser) {
            this.initializeSlide = true;    
        }
        
    }
}
