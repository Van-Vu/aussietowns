import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import ListingOfferForm from '../form/listingoffer.component.vue';

@Component({
    name: "listingoffermodal",
    components: {
        "modalshell": ModalShellComponent,
        "listingofferform": ListingOfferForm
    }
})

export default class ListingOfferModalComponent extends Vue {
    @Prop show: boolean;

    created(): void {
    }

    close() {
        this.$emit('onClose');
    }
}
