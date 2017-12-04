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
    isSending: boolean = false;

    onContact() {
        this.isSending = true;
        this.$store.dispatch("SEND_ENQUIRY", this.model)
            .then(() => {
                let adsfad = 'asdfasdfa';
                this.isSending = false;
            });
    }
}

