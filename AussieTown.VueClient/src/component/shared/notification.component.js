var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
var NotificationComponent = (function (_super) {
    __extends(NotificationComponent, _super);
    // https://forum-archive.vuejs.org/topic/2122/resusable-global-notification-popups-with-vue-the-store-pattern-foundation-and-animate-css/5
    function NotificationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NotificationComponent.prototype, "notifications", {
        get: function () {
            return this.$store.state.notifications;
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.addNotification = function (notification) {
        this.$store.dispatch('ADD_NOTIFICATION', notification);
    };
    NotificationComponent.prototype.removeNotification = function (notification) {
        this.$store.dispatch('REMOVE_NOTIFICATION', notification);
    };
    NotificationComponent.prototype.triggerClose = function () {
        this.removeNotification(this.$store.state.notifications[0]);
    };
    return NotificationComponent;
}(Vue));
NotificationComponent = __decorate([
    Component({
        name: "NotificationComponent"
    })
], NotificationComponent);
export default NotificationComponent;
