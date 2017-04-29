import Vue from "vue";
import Component from "vue-class-component";
import NavMenuComponent from './components/navmenu/navmenu.component.vue';

@Component({
    name: "App",
    components: {
        "nav-menu": NavMenuComponent
    }
})
export default class App extends Vue {
}
