import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import ListingRequestForm from '../form/listingrequest.component.vue';

@Component({
    name: "listingrequestmodal",
    components: {
        "modalshell": ModalShellComponent,
        "listingrequestform": ListingRequestForm
    }
})

export default class ListingRequestModalComponent extends Vue {
    @Prop show: boolean;

    created(): void {
    }

    close() {
        this.$emit('onClose');
    }
}
