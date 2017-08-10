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
import NavMenuComponent from './component/navmenu/navmenu.component.vue';
import NotificationComponent from './component/shared/notification.component.vue';
import LoadingComponent from './component/shared/loading.component.vue';
import LoginModal from './component/modal/loginmodal.component.vue';
import LogService from './service/log.service';
import router from './router';
import "reflect-metadata";
//if (process.env.VUE_ENV === 'client') {
//    Vue.component('datepicker', require('vuejs-datepicker'))
//    Vue.component('vue-timepicker', require('vue2-timepicker'))
//}
//Vue.use(ElementUI);
import VueCookie from 'vue-js-cookie';
Vue.use(VueCookie);
import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);
import FBSignInButton from 'vue-facebook-signin-button';
Vue.use(FBSignInButton);
import lazy from 'vue-lazy-image';
Vue.use(lazy, {
    loading: '/static/images/loading.gif',
    try: 2,
});
import Acl from './plugin/vue-acl';
Vue.use(Acl, { router: router, init: 'any' });
Vue.directive('focus', {
    inserted: function (el, binding) {
        if (binding.value)
            el.focus();
        else
            el.blur();
    },
});
import VueMask from 'v-mask';
Vue.use(VueMask);
import vMediaQuery from './component/shared/external/v-media-query';
Vue.use(vMediaQuery);
Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in. Only available in 2.2.0+
    console.log('damn it!');
    console.log(info);
    console.log(err);
    (new LogService()).logError(err.message, err.stack);
};
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(App.prototype, "currentPage", {
        get: function () {
            return this.$store.state.currentPage;
        },
        set: function (value) {
            this.currentPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "showLoginModal", {
        get: function () {
            return this.$store.state.showLoginModal;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.mounted = function () {
        // Bodom hack: hacky way to hide loading screen on server load
        this.$el.parentElement.childNodes[0].style.display = "none";
        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");
        // Bodom hack: https://stackoverflow.com/questions/41185809/vue-js-v-bindclass-doesnt-update-even-though-model-does
        if (this.$store.state.currentPage == 'home') {
            Vue.delete(this.$store.state, 'currentPage');
            Vue.set(this.$store.state, 'currentPage', 'home');
        }
    };
    App.prototype.hideLoginModal = function () {
        this.$store.dispatch('HIDE_LOGIN_MODAL');
    };
    App.prototype.onSuccessfulLogin = function () {
        this.hideLoginModal();
    };
    App = __decorate([
        Component({
            name: "App",
            components: {
                "nav-menu": NavMenuComponent,
                "notifications": NotificationComponent,
                "loading": LoadingComponent,
                'loginmodal': LoginModal
            }
        })
    ], App);
    return App;
}(Vue));
export default App;
