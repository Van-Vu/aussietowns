import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
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
    @Prop disableDays: any;
    @Prop bookingDate: string;
    @Prop participants: number;

    created(): void {
    }

    onParticipantChanged(value) {
        this.$emit('participantChanged', value);
    }

    onBookingDateChanged(value) {
        this.$emit('bookingDateChanged', value);
    }
}
