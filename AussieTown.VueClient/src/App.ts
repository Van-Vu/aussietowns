import Vue from "vue";
//import { Component, Watch } from "vue-property-decorator";

import Component from 'vue-class-component';

import NavMenuComponent from './component/navmenu/navmenu.component.vue';
import NotificationComponent from './component/shared/notification.component.vue';
import LoadingComponent from './component/shared/loading.component.vue';

import LoginModal from './component/modal/loginmodal.component.vue';
import ScheduleModalComponent from './component/modal/schedulemodal.component.vue';
import ImageCropModalComponent from './component/modal/imagecropmodal.component.vue';


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

import VueProgressBar from 'vue-progressbar';

const options = {
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

// augment options
// another option: https://github.com/declandewet/vue-meta/issues/88
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        metaInfo?: {};
    }
}


@Component({
    name: "App",
    components: {
        "navmenu": NavMenuComponent,
        "notifications": NotificationComponent,
        "loading": LoadingComponent,
        'loginmodal': LoginModal,
        'schedulemodal': ScheduleModalComponent,
        'imagecropmodal': ImageCropModalComponent
    },
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'Default Title',
        // all titles will be injected into this template
        titleTemplate: '%s | My Awesome Webapp',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
            { name: 'theme-color', content: '#99CD4E' },
            { name: 'mobile-web-app-capable', content: 'yes' }
        ]
    }
})

export default class App extends Vue {
    //currentView: string = 'loginmodal';
    //dynamicProps: string = '';
    $Progress: any;
    $cookie: any;

    get currentPage() {
        return this.$store.state.currentPage;
    }

    get showModal() {
        return this.$store.state.dynamicModal && this.$store.state.dynamicModal.props && this.$store.state.dynamicModal.props.show;
    }

    get currentView() {
        return this.$store.state.dynamicModal;
    }

    //get showLoginModal() {
    //    return this.$store.state.showLoginModal;
    //}

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

        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start();
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress
                // parse meta tags
                this.$Progress.parseMeta(meta);
            }
            //  start the progress bar
            this.$Progress.start();
            if (process.env.VUE_ENV === 'client') {
                window.scrollTo(0, 0);
            }
            //  continue to next page
            next();
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish();
        })

    }

    mounted() {
        // Bodom hack: hacky way to hide loading screen on server load
        (this.$el.parentElement.querySelector('.early-loading-wrapper') as any).style.display = "none";

        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");

        // Bodom hack: https://stackoverflow.com/questions/41185809/vue-js-v-bindclass-doesnt-update-even-though-model-does
        if (this.$store.state.currentPage == 'home') {
            Vue.delete(this.$store.state, 'currentPage');
            Vue.set(this.$store.state, 'currentPage', 'home');
        }

        //window.addEventListener('beforeunload', this.leaving);
    }

    //leaving() {
    //    if (!this.$store.state.rememberMe) {
    //        this.$store.dispatch('SET_CURRENT_USER', null);
    //        this.$cookie.set('mtltk', null);
    //    }
    //}

    onSaveSchedule(event) {
        console.log(event);
    }

    onCloseModal() {
        this.$store.dispatch('HIDE_MODAL');        
    }
}
