import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import AutoCompleteComponent from "../shared/autocomplete.vue";
import { Utils } from '../utils';
import ListingModel from '../../model/listing.model';
import Swiper from './external/vue-swiper.vue';
import { CardType } from '../../model/enum';
import CheckButtonComponent from "../shared/checkbutton.component.vue";


import lazy from 'vue-lazy-image';

Vue.use(lazy, {
    loading: '/static/images/loading.gif', //loading image 
    try: 2, // the count of try to load one image 
});

@Component({
    name: "CardFull",
    components: {
        "swiper": Swiper,
        "checkButton": CheckButtonComponent
    }
})

export default class CardFullComponent extends Vue {
    @Prop() cardDetail: any;
    @Prop() cardType: CardType;
    id:number = 0;
    location: string = '';
    owner: string = '';
    header: string = '';
    cost: number = 0;
    date: string = '';
    time: string = '';
    headerLink: string = '';
    imageUrls: string = '';
    duration: string = '';
    description: string = '';
    cardLinkTo: Object = null;
    tagList: Array<string> = null;

    created(): void {
        this.id = this.cardDetail.id;
        this.location = this.cardDetail.location;
        this.header = this.cardDetail.header;
        this.cost = this.cardDetail.cost;
        this.owner = this.cardDetail.primaryOwner;
        this.imageUrls = this.cardDetail.imageUrls ? this.cardDetail.imageUrls.split(';') : '';
        this.headerLink = this.header ? Utils.seorizeString(this.header) : '';
        this.description = this.cardDetail.description;

        if (!!this.cardDetail.schedules) {
            var startDatetime = this.cardDetail.schedules.length > 0 ? new Date(this.cardDetail.schedules[0].startDate) : new Date();
            this.date = Utils.formatDate(startDatetime);
            this.time = Utils.getTime(startDatetime);            
            this.duration = this.cardDetail.schedules.length > 0 ? this.cardDetail.schedules[0].duration : 0;
        }

        switch (this.cardType) {
            case CardType.Article:
                this.cardLinkTo = { name: 'aboutus', params: { seoString: this.headerLink, articleId: this.id } };
                break;
            case CardType.Listing:
            default:
                this.cardLinkTo = { name: 'listingDetail', params: { seoString: this.headerLink, listingId: this.id } };
                break;

        }

        if (!!this.cardDetail.tagList) {
            this.tagList = this.cardDetail.tagList;
        }
    }

    get isListingType() {
        return this.cardType === CardType.Listing;
    }
}
