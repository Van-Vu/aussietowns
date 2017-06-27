import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import LoginModal from '../modal/loginmodal.component.vue';
import MenuModal from '../modal/menumodal.component.vue';
import RegistrationModal from '../modal/registrationmodal.component.vue';
import SearchBarComponent from '../shared/search/searchbar.component.vue';


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
    $cookie: any;

    showSecondSearchBar: boolean = false;
    showLoginModal: boolean = false;
    showRegistrationModal: boolean = false;
    showMenuModal: boolean = false;

    // To handle scroll event
    currentTime = Date.now();

    get currentPage() {
        return this.$store.state.currentPage;
    }

    created() {
        if (process.env.VUE_ENV === 'client') {
            window.addEventListener('scroll', this.handleScroll);
        }

        if (this.currentPage != null && this.currentPage !== 'home') {
            this.showSecondSearchBar = true;
        }
    }

    destroyed() {
        if (process.env.VUE_ENV === 'client') {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll(event) {
        let timeNow = Date.now();

        if (timeNow - this.currentTime > 50) {
            // Blacken header color
            if (window.scrollY > 100) {
                this.isSticky = true;
            } else {
                this.isSticky = false;
            }

            // Attach search bar
            if (this.currentPage != null && this.currentPage === 'home') {
                //console.log(this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top);
                if (this.$root.$el.querySelector('#searchBarHomepage').getBoundingClientRect().top < 0) {
                    this.showSecondSearchBar = true;
                } else {
                    this.showSecondSearchBar = false;
                }
            }

            this.currentTime = timeNow;
        }
    }

    @Watch('showSecondSearchBar')
    onPropertyChanged(value: string, oldValue: string) {
        console.log(`secondbar value ${value}`);
    }

    @Watch('$route.params')
    onRouteParamChanged(value: string, oldValue: string) {
        this.showMenuModal = false;
        this.showLoginModal = false;
        if (this.currentPage != null && this.currentPage != 'home') {
            this.showSecondSearchBar = true;
        }
    }

    onSuccessfulLogin(responseToken) {
        if (responseToken) {
            this.$cookie.set('mtltk', responseToken.token);
            this.$cookie.set('mtluserId', responseToken.userId);
            this.showLoginModal = false;
        }
    }
    onSelect() { console.log('select'); }
    onSearch() { console.log('search'); }
    //ngOnInit() {
    //    if (isBrowser) {
    //        Observable.fromEvent(window, 'resize')
    //            .debounceTime(100)
    //            .subscribe(e => {
    //                this.onWindowResize();
    //            });

    //        Observable.fromEvent(window, 'scroll')
    //            .throttleTime(1000)
    //            .subscribe(e => {
    //                this.onWindowScroll();
    //            });
            

    //        this.onWindowResize();
    //    }
    //}

    //onWindowResize() {
    //    let windowMode = this.detectionService.getCurrentMode();
    //    if (windowMode == DeviceMode.Mobile) {
    //        this.hideNavToggle = false;
    //    } else {
    //        this.hideNavToggle = true;
    //    }
    //}

    //onWindowScroll() {
    //    this.isSticky = this.detectionService.isScrollOverHalfPage();
    //}

    //handleLoggedIn(loggedInfo) {
    //    if (loggedInfo) {
    //        this.isLoggedin = true;
    //        this.name = loggedInfo.name;
    //        this.id = loggedInfo.id;
    //    } else {
    //        this.isLoggedin = false;
    //    }
    //}

    //onLogout() {
    //    Cookie.delete("token");
    //    this.isLoggedin = false;
    //}

    //onTest() {
    //    this.userService.getUserInfo(1).subscribe(
    //        data => {
    //            var abc = data;
    //        });
    //}

    //onNavToggle() {
    //    this.isMenuOpen = !this.isMenuOpen;
    //    return false;
    //}
}
