import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import AutoCompleteComponent from "../shared/autocomplete.vue";
import { Utils } from '../utils';
import ListingModel from '../../model/listing.model';
import * as Swiper from './external/vue-swiper.vue';


@Component({
    name: "ListingCard",
    components: {
        "swiper": Swiper
    }
})

export default class ListingCardComponent extends Vue {
    @Prop listingDetail: any;
    id:number = 0;
    location: string = '';
    hostName: string = '';
    header: string = '';
    cost: number = 0;
    date: string = '';
    time: string = '';
    description: string = '';
    headerLink: string = '';

    slides: Array<any> = [
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/a5bdb2fc08f9096fb1ef3afca2e5c1ff5292daf9fe7b86b8710d091ae7fa5547/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/5da2f1e6962f0c61837683b9fedbed7f0f2bb39d87626fda2cc1176d2f892fbc/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/7f905e034dbde2f070551d1c979bac39b5e58a9a43e8d454bc20a1f23924c2e4/400/232/1.0" },
        { "text": "", "imgSrc": "https://images.outbrain.com/Imaginarium/api/uuid/2466d2267dc2316b277610eafb1d957d7ce978df7e9bdd053fd8c67c40d57165/400/232/1.0" }
    ];


    onSlideChangeStart(currentPage) {
        console.log('onSlideChangeStart', currentPage);
    }

    onSlideChangeEnd(currentPage) {
        console.log('onSlideChangeEnd', currentPage);
    }

    globalconfig: any;

    created(): void {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.hostName = this.listingDetail.primaryOwner;
        var startDatetime = new Date(this.listingDetail.schedules[0].startDate);
        this.date = Utils.getDate(startDatetime);
        this.time = Utils.getTime(startDatetime);
        this.description = this.listingDetail.description;
        this.headerLink = Utils.seorizeString(this.header);
    }
}
