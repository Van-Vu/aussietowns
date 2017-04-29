import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: 'modal-shell'
})
    
export default class ModalShellComponent  extends Vue{
    @Prop show: boolean;

    created(): void {
    }

    close() {
        this.$emit('onClose');
    }
}