"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var user_service_1 = require("../../services/user.service");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
var ProfileSearchComponent = (function () {
    function ProfileSearchComponent(userService) {
        this.userService = userService;
        this.addedUser = new core_1.EventEmitter();
        this.searchTerms = new Subject_1.Subject();
    }
    ProfileSearchComponent.prototype.search = function (term) {
        // Push a search term into the observable stream.
        this.searchTerms.next(term);
    };
    ProfileSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.miniProfile = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.userService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling
            console.log("Error in component ... " + error);
            return Observable_1.Observable.of([]);
        });
        var abs = this.miniProfile;
    };
    ProfileSearchComponent.prototype.onAdd = function (profile) {
        this.addedUser.emit(profile);
        this.searchBox.nativeElement.value = '';
        this.searchTerms.next('');
    };
    return ProfileSearchComponent;
}());
__decorate([
    core_1.ViewChild("searchBox"),
    __metadata("design:type", Object)
], ProfileSearchComponent.prototype, "searchBox", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ProfileSearchComponent.prototype, "addedUser", void 0);
ProfileSearchComponent = __decorate([
    core_1.Component({
        selector: 'profilesearch',
        template: require('./profilesearch.component.html'),
        styles: [require('./profilesearch.component.css')]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ProfileSearchComponent);
exports.ProfileSearchComponent = ProfileSearchComponent;
//# sourceMappingURL=profilesearch.component.js.map