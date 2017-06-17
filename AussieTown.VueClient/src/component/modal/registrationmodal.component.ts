import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import RegistrationForm from '../form/registration.component.vue';

@Component({
    name: "RegistrationModal",
    components: {
        "modalshell": ModalShellComponent,
        'registrationform': RegistrationForm
    }
})

export default class RegistrationModal extends Vue {
    @Prop show: boolean;

    created(): void {
    }

    close() {
        this.$emit('onClose');
    }
}
