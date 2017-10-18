var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ScheduleModel from './schedule.model';
import { AutocompleteItem } from './autocomplete.model';
import { Utils } from '../component/utils';
import { Type } from "class-transformer";
var ListingModel = /** @class */ (function () {
    function ListingModel() {
        this.tourOperators = new Array();
        this.tourGuests = new Array();
        this.locationDetail = new AutocompleteItem();
        this.schedules = new Array();
        this.imageList = new Array();
        //this.schedules.push(new ScheduleModel(new Date().toJSON().slice(0, 10).replace(/-/g, '/'), '00:00', '00:00', new Date().toJSON().slice(0, 10).replace(/-/g, '/'),'',[]));
        this.schedules.push(new ScheduleModel(new Date().toJSON().slice(0, 10).replace(/-/g, '/'), '00:00', '00:00', '', '', []));
    }
    Object.defineProperty(ListingModel.prototype, "headerLink", {
        get: function () {
            return this.header ? Utils.seorizeString(this.header) : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingModel.prototype, "descriptionText", {
        get: function () {
            return this.description ? Utils.stripHtml(this.description).replace(/\n/g, '<br/>') : '';
        },
        set: function (value) {
            this.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListingModel.prototype, "requirementText", {
        get: function () {
            return this.requirement ? Utils.stripHtml(this.requirement).replace(/\n/g, '<br/>') : '';
        },
        set: function (value) {
            this.requirement = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Type(function () { return ScheduleModel; }),
        __metadata("design:type", Array)
    ], ListingModel.prototype, "schedules", void 0);
    return ListingModel;
}());
export default ListingModel;
