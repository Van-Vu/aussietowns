var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LocationSearchComponent from './locationsearch.component.vue';
var SearchBarComponent = (function (_super) {
    __extends(SearchBarComponent, _super);
    function SearchBarComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchBarComponent.prototype.onSelect = function (val) {
        this.$emit('onSelect', val);
    };
    SearchBarComponent.prototype.onSearch = function (val) {
        //{ name: 'user', params: { userId: 123 } }
        this.$emit('onSearch', val);
    };
    return SearchBarComponent;
}(Vue));
SearchBarComponent = __decorate([
    Component({
        name: "UserSearch",
        components: {
            "locationsearch": LocationSearchComponent
        }
    })
], SearchBarComponent);
export default SearchBarComponent;
