import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import ContactModel from '../../model/contact.model';

@Component({
    name: 'ContactForm',
    components: {

    }
})

export default class ContactForm extends Vue {
    @Prop() model: any;
    formSubmitting: boolean = false;

    onContact() {
        this.formSubmitting = true;
        this.$store.dispatch("SEND_ENQUIRY", this.model)
            .then(() => this.$emit('onClose'))
            .catch(() => this.formSubmitting = false);
    }
}

