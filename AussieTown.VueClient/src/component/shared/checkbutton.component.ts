import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import CheckButtonModel from '../../model/checkbutton.model';


@Component({
    name: "CheckButton"
})

export default class CheckButton extends Vue {
    @Prop() model: CheckButtonModel[];
    @Prop() checked: Array<string>;
    @Prop() isEditing: boolean;
    checkValue: Array<string> = new Array<string>();
    readonlyValue: CheckButtonModel[] = [];

    created() {
        //this.model = [
        //    new CheckButtonModel('1', 'Apple', 'Apple'),
        //    new CheckButtonModel('2', 'Orange', 'Orange'),
        //    new CheckButtonModel('3', 'Pear', 'Pear'),
        //    new CheckButtonModel('4', 'Cherry', 'Cherry'),
        //    new CheckButtonModel('5', 'Cherry2', 'Cherryasdf asdfa sdf adfsa '),
        //    new CheckButtonModel('6', 'Cherry3', 'asdfa sdf adfsa'),
        //];
        this.checkValue = this.checked;
    }

    @Watch('checkValue')
    onCheckedValueChanged(value: any, oldValue: any) {
        this.readonlyValue.length = 0;
        for (var item of this.checkValue) {
            this.readonlyValue.push(new CheckButtonModel('', item, item));
        }

        this.$emit('onChange', value);
    }
}
