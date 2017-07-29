import Vue from "vue";
import Component from "vue-class-component";
import NavMenuComponent from './component/navmenu/navmenu.component.vue';
import NotificationComponent from './component/shared/notification.component.vue';
import LoadingComponent from './component/shared/loading.component.vue';
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
    loading: '/static/images/giphy.gif', //loading image 
    try: 2, // the count of try to load one image 
});


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

import VueMask from 'v-mask'
Vue.use(VueMask)


//Vue.config.errorHandler = function (err, vm, info) {
//    // handle error
//    // `info` is a Vue-specific error info, e.g. which lifecycle hook
//    // the error was found in. Only available in 2.2.0+

//    console.log('damn it!');
//    console.log(info);
//    console.log(err);
//}

@Component({
    name: "App",
    components: {
        "nav-menu": NavMenuComponent,
        "notifications": NotificationComponent,
        "loading": LoadingComponent
    }
})


export default class App extends Vue {
    mounted() {
        // Bodom hack: hacky way to hide loading screen on server load
        (this.$el.parentElement.childNodes[0] as any).style.display = "none";

        // Bodom hack: disable in case of jumping directly to a page
        this.$store.dispatch("DISABLE_LOADING");
    }
}
