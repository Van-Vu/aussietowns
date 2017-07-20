import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import BookingModel from '../model/booking.model';
import ListingModel from '../model/listing.model';
import User from '../model/user.model';
import ListingService from '../service/listing.service';

import { plainToClass, classToPlain } from "class-transformer";

@Component({
    name: 'BookingPage'
})

export default class BookingPage extends Vue {
    model: BookingModel = null;

    asyncData({ store, route }) {
        if (!(store.state.listing instanceof ListingModel) || (store.state.booking == null)) {
            //route.push({ name: "home" });
            //route.next('/home');
        }
    }

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'booking');
        if (this.$store.state.listing instanceof ListingModel) {
            this.model = new BookingModel(this.$store.state.listing, this.generateParticipants(), this.$store.state.booking.date, this.$store.state.booking.time);
        } else {
            this.$router.push({ name: "home" });
        }
    }

    confirmBooking() {
        (new ListingService()).bookAListing(this.constructBookingRequest());
    }

    constructBookingRequest() {
        return {
            listingId: this.model.listing.id,
            bookingDate: this.model.bookingDate,
            time: this.model.time,
            participants: this.model.participants
        };
    }

    generateParticipants() {
        let users = [plainToClass(User, classToPlain(this.$store.state.loggedInUser))];
        if (this.$store.state.booking != null && this.$store.state.booking.participants > 0) {
            for (var i = 0; i < this.$store.state.booking.participants - 1; i++) {
                users.push(new User());
            }
        }

        return users;
    }
}