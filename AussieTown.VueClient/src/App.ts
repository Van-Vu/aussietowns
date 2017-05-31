import Vue from "vue";
import Component from "vue-class-component";
import NavMenuComponent from './components/navmenu/navmenu.component.vue';

//let window: any;

if (process.env.VUE_ENV === 'client') {
    Vue.component('datepicker', require('vuejs-datepicker'))
    //Vue.component('vue-timepicker', require('vue2-timepicker'))
}
//Vue.use(ElementUI);


@Component({
    name: "App",
    components: {
        "nav-menu": NavMenuComponent
    }
})


export default class App extends Vue {
//let process: any;
	//console.log(`Bodom: ${process.env}`);
}
