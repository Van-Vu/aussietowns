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
        //this.schedules.push(new ScheduleModel(Utils.getDate(new Date()), { HH: '08', mm: '00' }, { HH: '08', mm: '00' }, Utils.getDate(new Date()), 1, ''));
    }

    get descriptionText(): string {
        return Utils.stripHtml(this.description).replace(/\n/g, '<br/>');
    }

    set descriptionText(value: string) {
        this.description = value;
    }
}