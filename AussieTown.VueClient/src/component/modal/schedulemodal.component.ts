import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import ScheduleModel from '../../model/schedule.model';
import ScheduleComponent from '../shared/schedule.component.vue';

@Component({
    name: "login-modal",
    components: {
        "modalshell": ModalShellComponent,
        "schedule": ScheduleComponent
    }
})

export default class ScheduleModal extends Vue {
    @Prop show: boolean;
    @Prop schedule: any;

    close() {
        this.$emit('onClose');
    }

    onSaveSchedule(scheduleObject) {
        this.close();
        this.$emit('onSave', scheduleObject);
    }
}