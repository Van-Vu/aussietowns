import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';
import LoginForm from '../form/loginform.component.vue';

@Component({
    name: "login-modal",
    components: {
        "modalshell": ModalShellComponent,
        "loginform": LoginForm
    }
})

export default class LoginModal  extends Vue{
    @Prop show: boolean;

    onClose() {
        this.$emit('onClose');
    }
}
