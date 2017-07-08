import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "NotificationComponent"
})

// https://forum-archive.vuejs.org/topic/2122/resusable-global-notification-popups-with-vue-the-store-pattern-foundation-and-animate-css/5
export default class NotificationComponent extends Vue {

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
