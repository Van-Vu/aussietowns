import { ListingType } from './enum';
import MiniProfile from './miniprofile.model';
import ScheduleModel from './schedule.model';
import { AutocompleteItem } from './autocomplete.model';

export default class ListingModel {
    public id: number;
    public listingType: ListingType;
    public tourOperators: MiniProfile[];
    public tourGuests: MiniProfile[];
    public schedules: ScheduleModel[];
    public locationDetail: AutocompleteItem;
    public cost: number;
    public header: string;
    public description: string;
    public requirement: string;
    public expectation: string;
    public minParticipant: number;

    constructor() {
        this.tourOperators = new Array<MiniProfile>();
        this.tourGuests = new Array<MiniProfile>();
        this.schedules = new Array<ScheduleModel>();
        //this.schedules.push(new ScheduleModel());
    }
}