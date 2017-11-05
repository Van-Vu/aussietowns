import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
    name: 'modal-shell'
})
    
export default class ModalShellComponent  extends Vue{
    @Prop() show: boolean;
    //cssClass: Object = null;

    get cssClass() {
        return this.$store.state.dynamicModal && this.$store.state.dynamicModal.props && this.$store.state.dynamicModal.props.show ? 'is-active' : 'is-deactive';
    }

    //@Watch('show')
    //onPropertyChanged(value: string, oldValue: string) {
    //    this.cssClass = { 'is-active': value, 'is-deactive': !value};
    //}

    close() {
        this.$emit('onClose');
    }
}