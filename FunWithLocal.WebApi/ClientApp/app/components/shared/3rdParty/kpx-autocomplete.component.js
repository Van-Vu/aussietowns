"use strict";
// Source: https://github.com/kEpEx/angular2-kpx-autocomplete
// Note: can't import directly due to webpack build fail
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kpx_autocomplete_models_1 = require("./kpx-autocomplete.models");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
var kpxAutocompleteComponent = /** @class */ (function () {
    function kpxAutocompleteComponent(renderer) {
        var _this = this;
        this.renderer = renderer;
        this.paramGetSearch = "search";
        this.minChars = 1;
        this.placeholder = "";
        this.cleanUp = false;
        this.onSelect = new core_1.EventEmitter();
        this.onSearch = new core_1.EventEmitter();
        this.term = new forms_1.FormControl();
        this.firstSet = true;
        this.showList = false;
        this.indexSelected = -1;
        this.dontBlur = false;
        /** Implemented as part of ControlValueAccessor. */
        this.onChange = function () {
        };
        this.onTouched = function () { };
        this.selected = new kpx_autocomplete_models_1.SelectedAutocompleteValue();
        this.term.valueChanges
            .debounceTime(200)
            .subscribe(function (term) {
            if (term && _this.indexSelected < 0) {
                if (term.length >= _this.minChars)
                    _this.fetch(term);
            }
        });
    }
    kpxAutocompleteComponent_1 = kpxAutocompleteComponent;
    Object.defineProperty(kpxAutocompleteComponent.prototype, "_textValue", {
        set: function (value) {
            this.selected.Description = value;
        },
        enumerable: true,
        configurable: true
    });
    kpxAutocompleteComponent.prototype.ngOnInit = function () {
        this.list = [];
    };
    kpxAutocompleteComponent.prototype.ngOnChanges = function (changes) {
        if (changes['textValue']) {
            this.selected.Description = changes['textValue'].currentValue;
        }
        if (changes['keyValue']) {
            this.selected.Value = changes['keyValue'].currentValue;
        }
        if (changes['searchData']) {
            this.list = changes['searchData'].currentValue;
        }
    };
    kpxAutocompleteComponent.prototype.fetch = function (search) {
        this.indexSelected = -1;
        this.onSearch.emit(search);
    };
    kpxAutocompleteComponent.prototype.onFocus = function () {
        this.showList = true;
    };
    kpxAutocompleteComponent.prototype.onBlur = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.dontBlur) {
                _this.showList = false;
                _this.indexSelected = -1;
            }
        }, 200);
    };
    kpxAutocompleteComponent.prototype.onKeyDown = function (event) {
        var key = event.keyCode;
        if (key == 13) {
            this.doSelectIndex(this.indexSelected);
            this.showList = false;
            event.preventDefault();
        }
    };
    kpxAutocompleteComponent.prototype.onKeyUp = function (event) {
        this.showList = true;
        var key = event.keyCode;
        if (key == 38 || key == 40 || key == 13) {
            if (key == 13) {
                this.showList = false;
            }
            else {
                if (key == 40)
                    this.indexSelected++;
                else
                    this.indexSelected--;
                this.refreshSelected();
            }
        }
    };
    kpxAutocompleteComponent.prototype.doSelectIndex = function (index) {
        this.indexSelected = index;
        this.selected.Description = "" + this.list[this.indexSelected].name;
        this.selected.Value = this.list[this.indexSelected].id;
        this.keyValue = this.selected.Value;
        this.onChange(this.list[this.indexSelected]);
        this.onSelect.emit(this.list[this.indexSelected]);
        this.firstSet = false;
        if (this.cleanUp) {
            this.indexSelected = -1;
            this.selected = new kpx_autocomplete_models_1.SelectedAutocompleteValue();
            this.renderer.invokeElementMethod(this.searchBox.nativeElement, 'focus', []);
        }
    };
    kpxAutocompleteComponent.prototype.refreshSelected = function () {
        var _this = this;
        this.list = this.list.filter(function (d, i) {
            if (i == _this.indexSelected)
                d.Selected = true;
            else
                d.Selected = false;
            return d;
        });
    };
    kpxAutocompleteComponent.prototype.onClickOption = function (item, index) {
        this.dontBlur = true;
        this.indexSelected = index;
        this.refreshSelected();
        this.doSelectIndex(this.indexSelected);
        this.dontBlur = false;
    };
    kpxAutocompleteComponent.prototype.writeValue = function (value) {
        if (value && value !== '') {
            this.selected.Description = value.name;
            this.selected.Value = value.id;
        }
    };
    kpxAutocompleteComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    kpxAutocompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    kpxAutocompleteComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.ViewChild("searchBox"),
        __metadata("design:type", Object)
    ], kpxAutocompleteComponent.prototype, "searchBox", void 0);
    __decorate([
        core_1.Input('text-value'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], kpxAutocompleteComponent.prototype, "_textValue", null);
    __decorate([
        core_1.Input('key-value'),
        __metadata("design:type", String)
    ], kpxAutocompleteComponent.prototype, "keyValue", void 0);
    __decorate([
        core_1.Input('param-get-search'),
        __metadata("design:type", String)
    ], kpxAutocompleteComponent.prototype, "paramGetSearch", void 0);
    __decorate([
        core_1.Input('min-chars'),
        __metadata("design:type", Number)
    ], kpxAutocompleteComponent.prototype, "minChars", void 0);
    __decorate([
        core_1.Input('placeholder'),
        __metadata("design:type", String)
    ], kpxAutocompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('search-data'),
        __metadata("design:type", rxjs_1.Observable)
    ], kpxAutocompleteComponent.prototype, "searchData", void 0);
    __decorate([
        core_1.Input('clear-after-selection'),
        __metadata("design:type", Boolean)
    ], kpxAutocompleteComponent.prototype, "cleanUp", void 0);
    __decorate([
        core_1.Output('onSelect'),
        __metadata("design:type", core_1.EventEmitter)
    ], kpxAutocompleteComponent.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], kpxAutocompleteComponent.prototype, "onSearch", void 0);
    kpxAutocompleteComponent = kpxAutocompleteComponent_1 = __decorate([
        core_1.Component({
            selector: 'kpx-autocomplete',
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return kpxAutocompleteComponent_1; }), multi: true },
            ],
            templateUrl: './kpx-autocomplete.component.html'
        }),
        __metadata("design:paramtypes", [core_1.Renderer])
    ], kpxAutocompleteComponent);
    return kpxAutocompleteComponent;
    var kpxAutocompleteComponent_1;
}());
exports.kpxAutocompleteComponent = kpxAutocompleteComponent;
//# sourceMappingURL=kpx-autocomplete.component.js.map