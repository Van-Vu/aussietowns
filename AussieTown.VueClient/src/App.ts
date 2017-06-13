import Vue from "vue";
import Component from "vue-class-component";
import NavMenuComponent from './components/navmenu/navmenu.component.vue';

//let window: any;

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
    try: 0, // the count of try to load one image 
});

@Component({
    name: "App",
    components: {
        "nav-menu": NavMenuComponent
    }
})


export default class App extends Vue {
    $cookie: any;
//let process: any;
	//console.log(`Bodom: ${process.env}`);
}
