import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import ContactForm from '../form/contactform.component.vue';

@Component({
    name: "ContactModal",
    components: {
        "modalshell": ModalShellComponent,
        "contactform": ContactForm
    }
})

export default class ContactModal extends Vue {
    @Prop() show: boolean;
    @Prop() contactModel: any;

    onClose() {
        this.$emit('onClose');
    }
}
