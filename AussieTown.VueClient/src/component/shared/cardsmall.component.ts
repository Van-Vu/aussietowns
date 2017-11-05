﻿import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import AutoCompleteComponent from "../shared/autocomplete.vue";
import { Utils } from '../utils';
import ListingModel from '../../model/listing.model';
import Swiper from './external/vue-swiper.vue';


@Component({
    name: "CardSmallComponent",
    components: {
        "swiper": Swiper
    }
})

export default class CardSmallComponent extends Vue {
    @Prop() listingDetail: any;
    id: number = 0;
    location: string = '';
    hostName: string = '';
    header: string = '';
    cost: number = 0;
    date: string = '';
    time: string = '';
    description: string = '';
    headerLink: string = '';
    imageUrl: string = '';


    created(): void {
        this.id = this.listingDetail.id;
        this.location = this.listingDetail.location;
        this.header = this.listingDetail.header;
        this.cost = this.listingDetail.cost;
        this.hostName = this.listingDetail.primaryOwner;
        this.imageUrl = this.listingDetail.imageUrls ? this.listingDetail.imageUrls.split(';')[0] : '';
        var startDatetime = this.listingDetail.schedules.length > 0 ? new Date(this.listingDetail.schedules[0].startDate) : new Date();
        this.date = Utils.formatDate(startDatetime);
        this.time = Utils.getTime(startDatetime);
        this.description = this.listingDetail.description;
        this.headerLink = Utils.seorizeString(this.header);
    }
}
