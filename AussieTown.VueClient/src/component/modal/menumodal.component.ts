import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ModalShellComponent from './modalshell.component.vue';

@Component({
    name: "login-modal",
    components: {
        "modalshell": ModalShellComponent,
    }
})

export default class MenuModal extends Vue {
    @Prop show: boolean;

    created(): void {
    }

    close() {
        this.$emit('onClose');
    }

    onSuccessfulLogin(responseToken) {
        this.$emit('onSuccessfulLogin', responseToken);
    }
}
