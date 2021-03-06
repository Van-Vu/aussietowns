import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import SearchBarComponent from '../shared/search/searchbar.component.vue';
import { AutocompleteItem } from '../../model/autocomplete.model';
import { Utils } from '../utils';

@Component({
    name: 'NavMenuComponent',
    components: {
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
    $cookie: any;

    searchSuburb: AutocompleteItem = null;

    showMenuModal: boolean = false;

    get currentPage() {
        return this.$store.state.currentPage;
    }

    get isLoggedIn() {
        return this.$store.getters.isLoggedIn;
    }

    get profilePhoto() {
        return this.$store.getters.profilePhoto;
    }

    get profileLink() {
        return this.$store.getters.profileLink;
    }

    get userId() {
        return this.$store.getters.userId;
    }

    created() {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    mounted() {
        if (this.$store.state.currentPage != 'home') {
            this.isSticky = true;
        }

        window.addEventListener('click', this.closeUserMenu);
    }

    destroyed() {
        if (process.env.VUE_ENV === 'client') {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('click', this.closeUserMenu);
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
        if (this.$route.name != 'home') {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }

        this.searchSuburb = null;
    }

    onSelect(val: AutocompleteItem) {
        this.searchSuburb = val;
    }

    onSearch(val) {
        if (this.searchSuburb) {
            this.$router.push({ name: 'search', params: { seoString: Utils.seorizeString(this.searchSuburb.name), suburbId: this.searchSuburb.id } });
        }
    }

    onShowLoginModal() {
        this.$store.dispatch('SHOW_LOGIN_MODAL');
    }

    onLogout() {
        //this.$store.dispatch('SET_CURRENT_USER', {});
        //this.$store.dispatch('SET_TOKEN', '');
        //this.$cookie.remove('mtltk');
        //this.$cookie.remove('mtl');
        //this.$router.push("home");

        window.location.href = '/logout';
    }

    closeUserMenu(e) {
        if ((!this.$el.contains(e.target)) && (e.target.id != 'popupUserMenu')) {
            this.showMenuModal = false;
        }
    }
}
