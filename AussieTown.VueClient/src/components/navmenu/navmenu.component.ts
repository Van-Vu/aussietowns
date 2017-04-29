import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";


@Component({
    name: 'nav-menu'
})
export default class NavMenuComponent extends Vue {

    isLoggedin: boolean = false;
    name: string = "test";
    id: number;
    hideNavToggle = false;
    isMenuOpen = false;
    isSticky = false;


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
