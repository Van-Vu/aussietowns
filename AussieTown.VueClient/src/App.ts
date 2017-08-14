import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import NavMenuComponent from './component/navmenu/navmenu.component.vue';
import NotificationComponent from './component/shared/notification.component.vue';
import LoadingComponent from './component/shared/loading.component.vue';
import LoginModal from './component/modal/loginmodal.component.vue';
import LogService from './service/log.service';
import router from './router'

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
    loading: '/static/images/loading.gif', //loading image 
    try: 2, // the count of try to load one image 
});

import Acl from './plugin/vue-acl';
Vue.use(Acl, { router: router, init: 'any' });

Vue.directive('focus', {
    inserted: function (el, binding) {
        if (binding.value) el.focus();
        else el.blur();
    },
    //update: function (el) {
    //    Vue.nextTick(function () {
    //        el.focus();
    //    })
    //}

    //componentUpdated: function (el, binding) {
    //    if (binding.modifiers.lazy) {
    //        if (Boolean(binding.value) === Boolean(binding.oldValue)) {
    //            return;
    //        }
    //    }

    //    if (binding.value) el.focus();
    //    else el.blur();
    //}
})

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
}

import VueFormWizard from 'vue-form-wizard';
Vue.use(VueFormWizard);

import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

import { Validator } from 'vee-validate';

@Component({
    name: "App",
    components: {
        "nav-menu": NavMenuComponent,
        "notifications": NotificationComponent,
        "loading": LoadingComponent,
        'loginmodal': LoginModal
    }
})


export default class App extends Vue {
    get currentPage() {
        return this.$store.state.currentPage;
    }

    get showLoginModal() {
        return this.$store.state.showLoginModal;
    }

    set currentPage(value: string) {
        this.currentPage = value;
    }

    created() {
        const dictionary = {
            en: {
                custom: {
                    email: {
                        required: '*'
                    },
                    firstname: {
                        required: '*'
                    },
                    lastname: {
                        required: '*'
                    },
                    phone: {
                        required: '*'
                    },
                    address: {
                        required: '*'
                    },
                    emergencyContact: {
                        required: '*'
                    }
                }
            }
        };

        Validator.updateDictionary(dictionary);

    }

    mounted() {
        // Bodom hack: hacky way to hide loading screen on server load
        (this.$el.parentElement.childNodes[0] as any).style.display = "none";

        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");

        // Bodom hack: https://stackoverflow.com/questions/41185809/vue-js-v-bindclass-doesnt-update-even-though-model-does
        if (this.$store.state.currentPage == 'home') {
            Vue.delete(this.$store.state, 'currentPage');
            Vue.set(this.$store.state, 'currentPage', 'home');
        }

    }

    hideLoginModal() {
        this.$store.dispatch('HIDE_LOGIN_MODAL');
    }

    onSuccessfulLogin() {
        this.hideLoginModal();
    }

}
