import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import BookingModel from '../model/booking.model';
import ListingModel from '../model/listing.model';
import UserModel from '../model/user.model';
import BookingService from '../service/booking.service';
import { plainToClass, classToPlain } from "class-transformer";
import AvailabilityComponent from '../component/booking/availability.component.vue';
import { ScreenSize, NotificationType } from '../model/enum';
import { detectScreenSize } from '../service/screen.service';
import UserSearchComponent from '../component/shared/search/usersearch.component.vue';
import { Utils } from '../component/utils';
import RingLoader from '../component/shared/external/ringloader.vue';

import store from '../store';

@Component({
    name: 'BookingDetailPage',
    components: {
        'availability': AvailabilityComponent,
        'usersearch': UserSearchComponent,
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
    @Prop() listingId: string;
    @Prop() seoString: string;

    isStickyBoxRequired: boolean = true;
    isDateChoosen: boolean = false;
    isLoading = false;
    errorMsg = '';
    $mq: any;

    static asyncData({ store, route }) {
        console.log("Bodom fetchData: " + route.params.listingId);
        if (route.params.listingId) {
            return store.dispatch('FETCH_LISTING_WITH_BOOKING_DETAIL', route.params.listingId);
        }

        //route.push("home");
    }

    get model() {
        return this.$store.state.booking;
    }

    get availableDays() {
        return this.$store.state.booking.slots.map((x) => new Date(x.bookingDate));
    }

    created() {
    }

    mounted() {
        var screenSize = detectScreenSize(this.$mq);
        switch (screenSize) {
            case ScreenSize.Desktop:
                this.isStickyBoxRequired = true;
                break;

            case ScreenSize.Tablet:
                this.isStickyBoxRequired = false;
                break;

            case ScreenSize.Mobile:
                this.isStickyBoxRequired = false;
                break;
        }
    }

    onModify() {
        (new BookingService()).modifyBooking(this.model.id, this.constructBookingRequest())
            .then(() => {
                this.isDateChoosen = true;
            });
    }

    onWithdraw() {
        (new BookingService()).withdrawBooking(this.model.id, this.model.participants.map((element) => element.name).join(","))
            .then(() => {
                this.isDateChoosen = true;
            });
    }

    generateParticipants(store) {
        let users = [plainToClass(UserModel, classToPlain(store.state.loggedInUser))];
        if (store.state.booking != null && store.state.booking.participants > 0) {
            for (var i = 0; i < store.state.booking.participants - 1; i++) {
                users.push(new UserModel());
            }
        }

        return users;
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
            });    
        }
    }

    constructBookingRequest() {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime
        };
    }
}