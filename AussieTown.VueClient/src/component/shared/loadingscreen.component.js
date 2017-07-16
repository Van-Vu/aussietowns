var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
var LoadingScreenComponent = (function (_super) {
    __extends(LoadingScreenComponent, _super);
    function LoadingScreenComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LoadingScreenComponent.prototype, "notifications", {
        get: function () {
            return this.$store.state.notifications;
        },
        enumerable: true,
        configurable: true
    });
    LoadingScreenComponent.prototype.addNotification = function (notification) {
        this.$store.dispatch('ADD_NOTIFICATION', notification);
    };
    LoadingScreenComponent.prototype.removeNotification = function (notification) {
        this.$store.dispatch('REMOVE_NOTIFICATION', notification);
    };
    LoadingScreenComponent.prototype.triggerClose = function () {
        this.removeNotification(this.$store.state.notifications[0]);
    };
    LoadingScreenComponent = __decorate([
        Component({
            name: "LoadingScreenComponent"
        })
    ], LoadingScreenComponent);
    return LoadingScreenComponent;
}(Vue));
export default LoadingScreenComponent;
