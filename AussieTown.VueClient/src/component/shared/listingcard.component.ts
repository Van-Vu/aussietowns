import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import AutoCompleteComponent from "../shared/autocomplete.vue";
import { Utils } from '../utils';
import ListingModel from '../../model/listing.model';
import Swiper from './external/vue-swiper.vue';


@Component({
    name: "CardFull",
    components: {
        "swiper": Swiper
    }
})

export default class CardFullComponent extends Vue {
    @Prop listingDetail: any;
    id:number = 0;
    location: string = '';
    hostName: string = '';
    header: string = '';
    cost: number = 0;
    date: string = '';
    time: string = '';
    headerLink: string = '';
    imageUrls: string = '';
    duration: string = '';
    description: string = '';

    created(): void {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.hostName = this.listingDetail.primaryOwner;
        this.imageUrls = this.listingDetail.imageUrls ? this.listingDetail.imageUrls.split(';') : '';
        var startDatetime = new Date(this.listingDetail.schedules[0].startDate);
        this.date = Utils.formatDate(startDatetime);
        this.time = Utils.getTime(startDatetime);
        this.headerLink = this.header ? Utils.seorizeString(this.header) : '';
        this.duration = this.listingDetail.schedules[0].duration;
        this.description = this.listingDetail.description;
    }
}
