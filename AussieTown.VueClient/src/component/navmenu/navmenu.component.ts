import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import LoginModal from '../modal/loginmodal.component.vue';
import MenuModal from '../modal/menumodal.component.vue';
import RegistrationModal from '../modal/registrationmodal.component.vue';
import SearchBarComponent from '../shared/search/searchbar.component.vue';
import { AutocompleteItem } from '../../model/autocomplete.model';
import { Utils } from '../utils';

@Component({
    name: 'nav-menu',
    components: {
        'loginmodal': LoginModal,
        'registrationmodal': RegistrationModal,
        'menumodal': MenuModal,
        "searchbar": SearchBarComponent
    }
})
export default class NavMenuComponent extends Vue {
    logginInUserId: number = 0;
    name: string = "test";
    hideNavToggle = false;
    isMenuOpen = false;
    isSticky = false;
    process: any;
    //profilePhoto = '';
    //isLoggedIn = false;
    searchSuburb: AutocompleteItem = null;

    showLoginModal: boolean = false;
    showRegistrationModal: boolean = false;
    showMenuModal: boolean = false;

    // To handle scroll event
    currentTime = Date.now();

    get currentPage() {
        return this.$store.state.currentPage;
    }

    get isLoggedIn() {
        return this.$store.getters.isLoggedIn;
    }

    get profilePhoto() {
        return this.$store.getters.profilePhoto;
    }

    created() {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    destroyed() {
        if (process.env.VUE_ENV === 'client') {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll(event) {
        if (this.currentPage != null && this.currentPage === 'home') {
            //console.log(this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top);
            if (this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top < 0) {
                this.isSticky = true;
            } else {
                this.isSticky = false;
            }
        }
    }

    @Watch('$route.params')
    onRouteParamChanged(value: string, oldValue: string) {
        this.showMenuModal = false;
        this.showLoginModal = false;
        if (this.$route.name != 'home') {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }

        this.searchSuburb = null;
    }

    onSuccessfulLogin() {
        this.showLoginModal = false;
    }

    onSelect(val: AutocompleteItem) {
        this.searchSuburb = val;
    }

    onSearch(val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });
        }
    }

    mounted() {
        //this.profilePhoto = this.$store.getters.profilePhoto;
        //this.isLoggedIn = this.$store.getters.isLoggedIn;

        if (this.$store.state.currentPage != 'home') {
            this.isSticky = true;
        }
    }
}
