import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ListingCardComponent from '../shared/listingcard.component.vue';
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';
import datepicker from '../shared/external/datepicker.vue';
import numberchooser from '../shared/numberchooser.component.vue';

@Component({
    name: "AvailabilityComponent",
    components: {
        "datepicker": datepicker,
        "numberchooser": numberchooser
    }
})

export default class AvailabilityComponent extends Vue {
    bookingDate: string = '';
    bookingTime: string = '';
    disableDays = {
        to: new Date(),
        days: [6, 0] // Disable Saturday's and Sunday's
    };

    availableTimeslot: string[] = null;

    created(): void {
    }

    @Watch('bookingTime')
    onBookingTimeChanged(value: string, oldValue: string) {
        this.$emit('bookingTimeChanged', value);
    }

    onBookingDateChanged(value) {
        let currentListing = this.$store.state.booking.listing;
        let timeslots = new Array<string>();
        timeslots.push(currentListing.schedules[0].startTime);

        this.availableTimeslot = timeslots;

        this.$emit('bookingDateChanged', value);
    }
}
