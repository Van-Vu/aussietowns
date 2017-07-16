import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "LoadingScreenComponent"
})

export default class LoadingScreenComponent extends Vue {

    get notifications() {
        return this.$store.state.notifications;
    }

    addNotification(notification) {
        this.$store.dispatch('ADD_NOTIFICATION', notification);
    }

    removeNotification(notification) {
        this.$store.dispatch('REMOVE_NOTIFICATION', notification);
    }

    triggerClose() {
        this.removeNotification(this.$store.state.notifications[0]);
    }
}
