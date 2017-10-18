import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import BookingModel from '../model/booking.model';
import ListingModel from '../model/listing.model';
import UserModel from '../model/user.model';
import ListingService from '../service/listing.service';
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

export default class BookingDetailPage extends Vue {
    @Prop bookingId: string;
    @Prop seoString: string;

    isStickyBoxRequired: boolean = true;
    isBooked: boolean = false;
    isLoading = false;
    errorMsg = '';
    $mq: any;

    asyncData({ store, route }) {
        console.log("Bodom fetchData: " + route.params.bookingId);
        if (route.params.bookingId) {
            return store.dispatch('FETCH_BOOKING_DETAIL', route.params.bookingId);
        }

        //route.push("home");
    }

    get model() {
        return this.$store.state.booking;
    }

    created() {
        console.log('bodom created');
        console.log(this.model);        
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

    confirmBooking() {
        return new Promise((resolve, reject) => {
            (new ListingService()).bookAListing(this.constructBookingRequest())
                .then(() => {
                    this.isBooked = true;
                    resolve(true);
                })
                .catch(() => reject('Please fill in participant information'));

            //if ((this.model.bookingDate) && (this.model.bookingTime)) resolve(true);

        });
        //alert('Form Submitted!');
    }

    constructBookingRequest() {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.bookingTime,
            participants: this.model.participants
        };
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
        this.$store.state.booking.bookingDate = value;
    }

    onBookingTimeChanged(value) {
        this.$store.state.booking.bookingTime = value;
    }

    //onProceed() {
    //    this.$store.dispatch('UPDATE_BOOKING', { participants: this.bookingNumber, date: this.bookingDate, time: '09:00' });
    //    this.$router.push({ name: "booking" });
    //}

    addMoreParticipant() {
        //this.$store.dispatch('ADD_BOOKING_PARTICIPANT',new UserModel());

        this.model.participants.push(new UserModel());
        var model = Object.assign({}, this.model);

        // Bodom hack: no way to push data to model.participants that trigger Vue state
        Vue.set(this, 'model', model);
    }

    removeParticipant(index) {
        if (confirm('Are you sure?')) {
            this.$store.dispatch('REMOVE_BOOKING_PARTICIPANT', index);
        }
    }

    setLoading(value) {
        this.isLoading = value;
    }

    handleErrorMessage(errorMsg) {
        this.errorMsg = errorMsg;
    }

    validateParticipantInfo() {
        return new Promise((resolve, reject) => {
            this.$validator.validateAll().then(result => {
                if (result) {
                    resolve(true);
                }
                reject('Please fill in required information');
            });
        });
    }

    validateBookingTime() {
        return new Promise((resolve, reject) => {
            if ((this.model.bookingDate) && (this.model.bookingTime)) resolve(true);
            reject('Please choose your suitable date and time');
        });
    }
}