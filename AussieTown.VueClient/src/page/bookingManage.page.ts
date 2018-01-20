import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import BookingService from '../service/booking.service';
import { plainToClass, classToPlain } from "class-transformer";
import AvailabilityComponent from '../component/booking/availability.component.vue';
import { ScreenSize, NotificationType, BookingStatus } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import { Utils } from '../component/utils';
import RingLoader from '../component/shared/external/ringloader.vue';

import store from '../store';

import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);

@Component({
    name: 'BookingManagePage',
    components: {
        'availability': AvailabilityComponent,
        'ringloader': RingLoader
    },
    beforeRouteEnter(to, from, next) {
        if (typeof Number((to.params as any).bookingId) == 'number') {
            next();
        } else {
            next({ name: "home" });
        }
    }
})

export default class BookingManagePage extends Vue {
    isDateChoosen: boolean = false;
    isLoading = false;
    errorMsg = '';
    $mq: any;
    checkBooking: Array<number> = new Array<number>();

    static asyncData({ store, route }) {
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_WITH_BOOKING_DETAIL', route.params.listingId);
        }

        //route.push("home");
    }

    get model() {
        return this.$store.state.listing;
    }

    get availableBookings() {
        return this.$store.state.listing.bookingSlots;
    }

    get bookingGroups() {
        return this.$store.state.bookingGroups;
    }

    created() {
    }

    mounted() {
        //var screenSize = detectScreenSize(this.$mq);
        //switch (screenSize) {
        //    case ScreenSize.Desktop:
        //        this.isStickyBoxRequired = true;
        //        break;

        //    case ScreenSize.Tablet:
        //        this.isStickyBoxRequired = false;
        //        break;

        //    case ScreenSize.Mobile:
        //        this.isStickyBoxRequired = false;
        //        break;
        //}
    }

    onApproveBooking() {
        this.$store.dispatch("ENABLE_LOADING");

        (new BookingService()).approveBooking(this.constructBookingApprove())
            .then(() => {
                this.isDateChoosen = true;
                this.$store.dispatch("DISABLE_LOADING");
            });
    }

    onWithdraw() {
        this.$store.dispatch("ENABLE_LOADING");

        (new BookingService()).withdrawBooking(this.model.id, this.model.participants.map((element) => element.name).join(","))
            .then(() => {
                this.isDateChoosen = true;
                this.$store.dispatch("DISABLE_LOADING");
            });
    }
    onBookingDateChanged(value) {
        this.model.bookingDate = value;
    }

    onBookingTimeChanged(value) {
        this.model.bookingTime = value;

        if (value != '') {
            this.isLoading = true;
            store.dispatch('FETCH_ALL_BOOKING_BY_DATE', this.constructBookingRequest())
            .then(() => {
                this.isDateChoosen = true;
                this.isLoading = false;
                this.checkBooking = this.getApprovedBookings()

            });    
        }
    }

    constructBookingRequest() {
        return {
            listingId: this.model.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime
        };
    }

    constructBookingApprove() {
        return {
            listingId: this.model.id,
            bookingIds: this.checkBooking
        };        
    }

    getApprovedBookings() {
        let bookingGroups = this.$store.state.bookingGroups;
        if (bookingGroups) {
            let confirmedBookingGroups = bookingGroups.filter(x => x.status === BookingStatus.Confirm);
            return confirmedBookingGroups.map(x => x.id);
        }

        return new Array<number>();
    }
}