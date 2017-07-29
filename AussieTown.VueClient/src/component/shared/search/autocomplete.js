// Source: https://github.com/kEpEx/angular2-kpx-autocomplete
// Note: can't import directly due to webpack build fail
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
import { SelectedAutocompleteValue } from '../../../model/autocomplete.model';
var AutoCompleteComponent = (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //@Output('onSelect') onSelect: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();
        //@Output() onSearch: EventEmitter<string> = new EventEmitter();
        _this.keyword = '';
        _this.selectedText = '';
        _this.focus = false;
        _this.selected = new SelectedAutocompleteValue();
        _this.firstSet = true;
        //private list: AutocompleteItem[];
        _this.showList = false;
        _this.indexSelected = -1;
        _this.dontBlur = false;
        return _this;
    }
    AutoCompleteComponent.prototype.beforeMounted = function () {
    };
    AutoCompleteComponent.prototype.created = function () {
        if (this.initialData) {
            this.keyword = this.initialData.name;
        }
    };
    Object.defineProperty(AutoCompleteComponent.prototype, "matches", {
        get: function () {
            return this.list;
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteComponent.prototype.onInput = function (val) {
        if (val && this.indexSelected < 0) {
            if (val.length >= this.minChars)
                this.fetch(val);
        }
    };
    AutoCompleteComponent.prototype.fetch = function (search) {
        this.indexSelected = -1;
        this.$emit("search", search);
    };
    AutoCompleteComponent.prototype.onFocus = function () {
        this.showList = true;
    };
    AutoCompleteComponent.prototype.onBlur = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.dontBlur) {
                _this.showList = false;
                _this.indexSelected = -1;
            }
        }, 200);
    };
    AutoCompleteComponent.prototype.onKeyDown = function (event) {
        var _this = this;
        var key = event.keyCode;
        // Enter
        if (key == 13) {
            if (this.indexSelected >= 0) {
                this.doSelectIndex(this.indexSelected);
            }
            this.showList = false;
            if ((this.selectedText != '') && (this.keyword == '')) {
                setTimeout(function () { _this.$emit('HeyIAmDone'); }, 1000);
            }
            event.preventDefault();
        }
        // Backspace
        if ((key == 8) && (this.keyword == '')) {
            this.selectedText = '';
        }
    };
    AutoCompleteComponent.prototype.onKeyUp = function (event) {
        this.showList = true;
        var key = event.keyCode;
        if (key == 38 || key == 40 || key == 13) {
            if (key == 13) {
                this.showList = false;
            }
            else {
                if (key == 40) {
                    this.indexSelected++;
                    if (this.indexSelected >= this.list.length)
                        this.indexSelected = 0;
                }
                else {
                    this.indexSelected--;
                    if (this.indexSelected < 0)
                        this.indexSelected = this.list.length - 1;
                }
                this.refreshSelected();
            }
        }
    };
    AutoCompleteComponent.prototype.doSelectIndex = function (index) {
        this.indexSelected = index;
        this.selected.Description = "" + this.list[this.indexSelected].name;
        this.selected.Value = this.list[this.indexSelected].id;
        this.$emit("select", this.list[this.indexSelected]);
        this.firstSet = false;
        this.selectedText = this.selected.Description;
        this.keyword = '';
        if (this.cleanUp) {
            this.indexSelected = -1;
            this.selected = new SelectedAutocompleteValue();
            this.selectedText = '';
        }
    };
    AutoCompleteComponent.prototype.refreshSelected = function () {
        this.$emit('refreshSelect', this.indexSelected);
        //this.list = this.list.filter((d, i) => {
        //    if (i === this.indexSelected) d.selected = true;
        //    else d.selected = false;
        //    return d;
        //});
    };
    AutoCompleteComponent.prototype.onClickOption = function (item, index) {
        this.dontBlur = true;
        this.indexSelected = index;
        this.refreshSelected();
        this.doSelectIndex(this.indexSelected);
        this.dontBlur = false;
    };
    __decorate([
        Prop,
        __metadata("design:type", Number)
    ], AutoCompleteComponent.prototype, "minChars", void 0);
    __decorate([
        Prop,
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "placeHolderText", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "initialData", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Boolean)
    ], AutoCompleteComponent.prototype, "cleanUp", void 0);
    __decorate([
        Prop,
        __metadata("design:type", Array)
    ], AutoCompleteComponent.prototype, "list", void 0);
    AutoCompleteComponent = __decorate([
        Component({
            name: "AutoComplete"
        })
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}(Vue));
export default AutoCompleteComponent;
