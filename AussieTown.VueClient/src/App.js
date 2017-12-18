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
//import { Component, Watch } from "vue-property-decorator";
import Component from 'vue-class-component';
import NavMenuComponent from './component/navmenu/navmenu.component.vue';
import NotificationComponent from './component/shared/notification.component.vue';
import PageLoadingComponent from './component/shared/pageloading.component.vue';
import LoginModal from './component/modal/loginmodal.component.vue';
import ScheduleModalComponent from './component/modal/schedulemodal.component.vue';
import ImageCropModalComponent from './component/modal/imagecropmodal.component.vue';
import ContactModal from './component/modal/contactmodal.component.vue';
import LogService from './service/log.service';
import router from './router';
//if (process.env.VUE_ENV === 'client') {
//    Vue.component('datepicker', require('vuejs-datepicker'))
//    Vue.component('vue-timepicker', require('vue2-timepicker'))
//}
//Vue.use(ElementUI);
import VueCookie from 'vue-js-cookie';
Vue.use(VueCookie);
// BODOM: DO NOT REMOVE for class-transformer
import "reflect-metadata";
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
Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in. Only available in 2.2.0+
    console.log(info);
    console.log(err);
    (new LogService()).logError(err.message, err.stack);
};
import { Validator } from 'vee-validate';
import VueProgressBar from 'vue-progressbar';
var options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '50px',
    transition: {
        speed: '2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
};
Vue.use(VueProgressBar, options);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(App.prototype, "currentPage", {
        get: function () {
            return this.$store.state.currentPage;
        },
        //get showLoginModal() {
        //    return this.$store.state.showLoginModal;
        //}
        set: function (value) {
            this.currentPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "showModal", {
        get: function () {
            return this.$store.state.dynamicModal && this.$store.state.dynamicModal.props && this.$store.state.dynamicModal.props.show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "currentView", {
        get: function () {
            return this.$store.state.dynamicModal;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.created = function () {
        var _this = this;
        var dictionary = {
            en: {
                custom: {
                    email: {
                        required: 'Email is required'
                    },
                    firstname: {
                        required: 'Firstname is required'
                    },
                    lastname: {
                        required: 'Lastname is required'
                    },
                    phone: {
                        required: 'Phone is required'
                    },
                    address: {
                        required: 'Address is required'
                    },
                    emergencyContact: {
                        required: 'Emergency Contact is required'
                    },
                    location: {
                        required: 'Location is required'
                    },
                    description: {
                        required: 'Description is required',
                        max: 'Maximum 300 chatacters allowed'
                    },
                    minParticipant: {
                        min_value: 'Minimum 1 participant'
                    },
                    cost: {
                        required: 'How much do you want to charge'
                    }
                }
            }
        };
        Validator.updateDictionary(dictionary);
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start();
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach(function (to, from, next) {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                var meta = to.meta.progress;
                // parse meta tags
                _this.$Progress.parseMeta(meta);
            }
            //  start the progress bar
            //this.$Progress.start();
            _this.$store.dispatch("ENABLE_LOADING");
            if (process.env.VUE_ENV === 'client') {
                window.scrollTo(0, 0);
                _this.$ua.trackView(to.meta.analytics || to.path, true);
            }
            //  continue to next page
            next();
        });
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach(function (to, from) {
            //  finish the progress bar
            //this.$Progress.finish();
            _this.$store.dispatch("DISABLE_LOADING");
        });
    };
    App.prototype.mounted = function () {
        // Bodom hack: hacky way to hide loading screen on server load
        this.$el.parentElement.querySelector('.early-loading-wrapper').style.display = "none";
        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");
        // Bodom hack: https://stackoverflow.com/questions/41185809/vue-js-v-bindclass-doesnt-update-even-though-model-does
        if (this.$store.state.currentPage == 'home') {
            Vue.delete(this.$store.state, 'currentPage');
            Vue.set(this.$store.state, 'currentPage', 'home');
        }
        //window.addEventListener('beforeunload', this.leaving);
    };
    //leaving() {
    //    if (!this.$store.state.rememberMe) {
    //        this.$store.dispatch('SET_CURRENT_USER', null);
    //        this.$cookie.set('mtltk', null);
    //    }
    //}
    App.prototype.onSaveSchedule = function (event) {
        console.log(event);
    };
    App.prototype.onCloseModal = function () {
        this.$store.dispatch('HIDE_MODAL');
    };
    App = __decorate([
        Component({
            name: "App",
            components: {
                "navmenu": NavMenuComponent,
                "notifications": NotificationComponent,
                "loading": PageLoadingComponent,
                'loginmodal': LoginModal,
                'schedulemodal': ScheduleModalComponent,
                'imagecropmodal': ImageCropModalComponent,
                'contactmodal': ContactModal
            },
            metaInfo: {
                // if no subcomponents specify a metaInfo.title, this title will be used
                title: 'Fun with Local',
                meta: [
                    { vmid: 'charset', charset: 'utf-8' },
                    { vmid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
                    { vmid: 'theme-color', name: 'theme-color', content: '#99CD4E' },
                    { vmid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
                    { vmid: 'description', name: 'description', content: 'Desire for unique experiences like a local with no booking fee? Includes travel tips, do and dont, hidden gems, indoor, outdoor activities. Check this out !' },
                    { vmid: 'ogtitle', property: 'og:title', content: 'Fun with Local' },
                    { vmid: 'ogtype', property: 'og:type', content: 'website' },
                    { vmid: 'ogurl', property: 'og:url', content: 'https://funwithlocal.com' },
                    { vmid: 'ogsitename', property: 'og:site_name', content: 'Fun with Local' },
                    { vmid: 'ogdescription', property: 'og:description', content: 'Fun with Local' }
                ],
                link: [
                    { vmid: 'manifest', rel: 'manifest', href: '/manifest.json' }
                ],
                //Bodom: dangerous
                __dangerouslyDisableSanitizers: ['meta']
            }
        })
    ], App);
    return App;
}(Vue));
export default App;
