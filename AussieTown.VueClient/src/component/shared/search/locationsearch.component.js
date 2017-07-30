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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SearchService from '../../../service/search.service';
import AutoCompleteComponent from './autocomplete.vue';
var LocationSearchComponent = (function (_super) {
    __extends(LocationSearchComponent, _super);
    function LocationSearchComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeHolderText = "Location";
        _this.locations = [];
        return _this;
    }
    LocationSearchComponent.prototype.onLocationSearch = function (searchTerm) {
        var _this = this;
        (new SearchService()).getLocation(searchTerm)
            .then(function (response) { return _this.locations = response; });
    };
    LocationSearchComponent.prototype.onLocationSelected = function (selectedItem) {
        this.$emit("onSelected", selectedItem);
    };
    LocationSearchComponent.prototype.triggerSearch = function () {
        this.$emit("HeyIAmDone");
    };
    LocationSearchComponent.prototype.onRefreshSelect = function (selectedIndex) {
        this.locations = this.locations.filter(function (d, i) {
            if (i === selectedIndex)
                d.selected = true;
            else
                d.selected = false;
            return d;
        });
    };
    return LocationSearchComponent;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", Object)
], LocationSearchComponent.prototype, "initialData", void 0);
LocationSearchComponent = __decorate([
    Component({
        name: "LocationSearchComponent",
        components: {
            "autocomplete": AutoCompleteComponent
        }
    })
], LocationSearchComponent);
export default LocationSearchComponent;
