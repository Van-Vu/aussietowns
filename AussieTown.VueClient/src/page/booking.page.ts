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
import VueFormWizard from 'vue-form-wizard';
Vue.use(VueFormWizard);

import VueMask from 'v-mask';
Vue.use(VueMask);

import vMediaQuery from '../component/shared/external/v-media-query';
Vue.use(vMediaQuery);


@Component({
    name: 'BookingPage',
    components: {
        'availability': AvailabilityComponent,
        "usersearch": UserSearchComponent,
        'ringloader': RingLoader
    },
    beforeRouteEnter(to, from, next) {
        if (store.state.listing instanceof ListingModel) {
            store.state.booking = new BookingModel(store.state.listing);
            next();
        } else {
            next({ name: "home" });
        }
    }
})

export default class BookingPage extends Vue {
    //model: BookingModel = null;
    isStickyBoxRequired: boolean = true;
    isBooked: boolean = false;
    isLoading = false;
    errorMsg = '';
    model: BookingModel = null;
    $mq: any;

    static asyncData({ store, route }) {
        //if (store.state.listing instanceof ListingModel) {
        //    //route.push({ name: "home" });
        //    //route.next('/home');
        //    store.state.booking = new BookingModel(store.state.listing);
        //} else {
        //    route.next({ name : "home" });
        //}
        store.dispatch('ADD_BOOKING_PARTICIPANT', plainToClass(UserModel, this.generateParticipants(store))); 
    }

    //get model() {
    //    return this.$store.state.booking;
    //}

    created() {
        this.model = this.$store.state.booking;
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
            (new BookingService()).confirmBooking(this.constructBookingRequest())
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

    static generateParticipants(store) {
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


            //this.$validator.validateAll().then(() => {
            //    // Data is valid, so we can submit the form.
            //    //document.querySelector('#myForm').submit();
            //    alert('From Submitted!');
            //    resolve(true);
            //}).catch(() => {
            //    reject('This is a custom validation error message. Click next again to get rid of the validation');
            //});
        });


        //return new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //            reject('This is a custom validation error message. Click next again to get rid of the validation')
        //        },
        //        1000);
        //});


        //return new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //        if (this.count < 1) {
        //            this.count++
        //            reject('This is a custom validation error message. Click next again to get rid of the validation')
        //        } else {
        //            this.count = 0
        //            resolve(true)
        //        }
        //    }, 1000)
        //})
    }

    validateBookingTime() {
        return new Promise((resolve, reject) => {
            if ((this.model.bookingDate) && (this.model.bookingTime)) resolve(true);
            reject('Please choose your suitable date and time');
        });
    }
    //validateBeforeSubmit(e) {
    //    e.preventDefault();
    //    this.$validator.validateAll().then(() => {
    //        alert('From Submitted!');
    //    }).catch(() => {
    //        return false;
    //    });
    //}
}