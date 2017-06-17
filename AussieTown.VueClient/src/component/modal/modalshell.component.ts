import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
    name: 'modal-shell'
})
    
export default class ModalShellComponent  extends Vue{
    @Prop show: boolean;
    cssClass: Object;

    @Watch('show')
    onPropertyChanged(value: string, oldValue: string) {
        this.cssClass = { 'is-active': value, 'is-deactive': !value};
    }

    close() {
        this.$emit('onClose');
    }
}