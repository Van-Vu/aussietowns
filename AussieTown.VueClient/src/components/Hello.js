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
import axios from "axios";
import AutoCompleteComponent from "./autocomplete/autocomplete.vue";
import Test from './test.vue';
//import 'vue-instant/dist/vue-instant.css'
//import VueInstant from './VueInstant.vue'
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msg = "Welcome to Your Vue.js App";
        _this.list = [];
        _this.searchStr = "";
        _this.selectedId = 0;
        _this.placeHolderText = "this is the test";
        _this.value = '';
        _this.suggestionAttribute = 'original_title';
        _this.suggestions = [];
        _this.selectedEvent = "";
        return _this;
    }
    Hello.prototype.created = function () {
        //axios
        //    .get("/api/hello")
        //    .then((res) => {
        //      this.msg = res.data.message;
        //    })
        //    .catch((ex) => console.log(ex));
    };
    Hello.prototype.onLocationSearch = function (event) {
        var abc = event;
        this.searchStr = event;
        this.list = [{ "id": 1, "name": "test" }, { "id": 2, "name": "test2" }];
    };
    Hello.prototype.onSelect = function (val) {
        this.searchStr = val.Description;
        this.selectedId = val.Value;
    };
    Hello.prototype.clickInput = function () {
        this.selectedEvent = 'click input';
    };
    Hello.prototype.clickButton = function () {
        this.selectedEvent = 'click button';
    };
    Hello.prototype.selected = function () {
        this.selectedEvent = 'selection changed';
    };
    Hello.prototype.enter = function () {
        this.selectedEvent = 'enter';
    };
    Hello.prototype.keyUp = function () {
        this.selectedEvent = 'keyup pressed';
    };
    Hello.prototype.keyDown = function () {
        this.selectedEvent = 'keyDown pressed';
    };
    Hello.prototype.keyRight = function () {
        this.selectedEvent = 'keyRight pressed';
    };
    Hello.prototype.clear = function () {
        this.selectedEvent = 'clear input';
    };
    Hello.prototype.escape = function () {
        this.selectedEvent = 'escape';
    };
    Hello.prototype.changed = function () {
        var that = this;
        this.suggestions = [];
        axios
            .get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' +
            this.value)
            .then(function (response) {
            response.data.results.forEach(function (a) {
                that.suggestions.push(a);
            });
        });
    };
    return Hello;
}(Vue));
__decorate([
    Prop,
    __metadata("design:type", String)
], Hello.prototype, "value", void 0);
__decorate([
    Prop,
    __metadata("design:type", String)
], Hello.prototype, "suggestionAttribute", void 0);
__decorate([
    Prop,
    __metadata("design:type", Object)
], Hello.prototype, "suggestions", void 0);
Hello = __decorate([
    Component({
        name: "Hello",
        components: {
            "test": Test,
            "autocomplete": AutoCompleteComponent
        }
    })
], Hello);
export default Hello;
