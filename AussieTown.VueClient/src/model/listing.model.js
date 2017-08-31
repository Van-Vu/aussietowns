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
        //this.schedules.push(new ScheduleModel(Utils.getDate(new Date()), { HH: '08', mm: '00' }, { HH: '08', mm: '00' }, Utils.getDate(new Date()), 1, ''));
    }
    Object.defineProperty(ListingModel.prototype, "descriptionText", {
        get: function () {
            return Utils.stripHtml(this.description).replace(/\n/g, '<br/>');
        },
        set: function (value) {
            this.description = value;
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
