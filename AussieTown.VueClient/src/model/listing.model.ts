import { ListingType } from './enum';
import MiniProfile from './miniprofile.model';
import ScheduleModel from './schedule.model';
import { AutocompleteItem } from './autocomplete.model';
import { Utils } from '../component/utils';
import ImageModel from './image.model';
import { Type } from "class-transformer";

export default class ListingModel {
    public id: number;
    public listingType: ListingType;
    public tourOperators: MiniProfile[];
    public tourGuests: MiniProfile[];

    @Type(() => ScheduleModel)
    public schedules: ScheduleModel[];

    public locationDetail: AutocompleteItem;
    public imageList: ImageModel[];
    public cost: number;
    public currency: number;
    public header: string;
    public description: string;
    public requirement: string;
    public minParticipant: number;
    public type: number;

    constructor() {
        this.tourOperators = new Array<MiniProfile>();
        this.tourGuests = new Array<MiniProfile>();
        this.locationDetail = new AutocompleteItem();
        this.schedules = new Array<ScheduleModel>();
        this.imageList = new Array<ImageModel>();
        //this.schedules.push(new ScheduleModel(new Date().toJSON().slice(0, 10).replace(/-/g, '/'), '00:00', '00:00', new Date().toJSON().slice(0, 10).replace(/-/g, '/'),'',[]));
        this.schedules.push(new ScheduleModel('', '00:00', '00:00', '', '', []));
    }

    get headerLink(): string {
        return this.header ? Utils.seorizeString(this.header) : '';
    }

    get descriptionText(): string {
        return this.description ? Utils.stripHtml(this.description).replace(/\n/g, '<br/>') : '';
    }

    set descriptionText(value: string) {
        this.description = value;
    }

    get requirementText(): string {
        return this.requirement ? Utils.stripHtml(this.requirement).replace(/\n/g, '<br/>') : '';
    }

    set requirementText(value: string) {
        this.requirement = value;
    }
}