import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ListingCardComponent from '../shared/listingcard.component.vue';
import { Utils } from '../utils';
import ListingModel from '../../model/listing.model';
import UserModel from '../../model/user.model';
import ScheduleModel from '../../model/schedule.model';
import { RepeatedType } from '../../model/enum';
import datepicker from '../shared/external/datepicker.vue';

@Component({
    name: "AvailabilityComponent",
    components: {
        "datepicker": datepicker
    }
})

export default class AvailabilityComponent extends Vue {
    //@Prop date: string;
    //@Prop time: string;
    @Prop() model: ScheduleModel;

    bookingTime: string = '';
    //disableDays = {
    //    to: new Date()
    //    //days: [6, 0] // Disable Saturday's and Sunday's
    //};

    days = ["0","1","2","3","4","5","6"];

    availableTimeslot: string[] = null;

    get disableDays() {
        switch (this.model.repeatedType) {
            case RepeatedType.Daily:
                return {
                    to: new Date()
                };
            case RepeatedType.Weekly:
                let disableDays = this.days.filter(x => this.model.repeatedDay.indexOf(x) == -1).map(x => +x);

                return {
                    to: new Date(),
                    days: disableDays
                };
        }
    }

    get startDateFormated() {
        return Utils.formatDate(new Date(this.model.startDate));
    }

    created(): void {
    }

    @Watch('bookingTime')
    onBookingTimeChanged(value: string, oldValue: string) {
        this.$emit('bookingTimeChanged', value);
    }

    onBookingDateChanged(value) {
        let timeslots = new Array<string>();
        timeslots.push(this.model.startTime);

        this.availableTimeslot = timeslots;
        this.bookingTime = '';
        this.$emit('bookingDateChanged', value);
    }
}
