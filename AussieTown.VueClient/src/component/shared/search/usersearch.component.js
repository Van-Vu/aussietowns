var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { AutocompleteItem } from '../../../model/autocomplete.model';
import SearchService from '../../../service/search.service';
import AutoCompleteComponent from './autocomplete.vue';
var UserSearchComponent = (function (_super) {
    __extends(UserSearchComponent, _super);
    function UserSearchComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeHolderText = "Type in a person name / email";
        _this.users = [];
        return _this;
    }
    UserSearchComponent.prototype.onUserSearch = function (searchTerm) {
        var _this = this;
        (new SearchService()).getUser(searchTerm)
            .then(function (response) { return _this.users = response; });
    };
    UserSearchComponent.prototype.onUserSelected = function (selectedItem) {
        this.$emit("onSelected", selectedItem);
    };
    __decorate([
        Prop,
        __metadata("design:type", AutocompleteItem)
    ], UserSearchComponent.prototype, "initialData", void 0);
    UserSearchComponent = __decorate([
        Component({
            name: "UserSearch",
            components: {
                "autocomplete": AutoCompleteComponent
            }
        })
    ], UserSearchComponent);
    return UserSearchComponent;
}(Vue));
export default UserSearchComponent;
