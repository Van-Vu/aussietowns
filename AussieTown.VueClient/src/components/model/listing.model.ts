import { ListingType } from './enum';
import MiniProfile from './miniprofile.model';
import ScheduleModel from './schedule.model';
import { AutocompleteItem } from './autocomplete.model';
import { Utils } from '../shared/utils';

export default class ListingModel {
    public id: number;
    public listingType: ListingType;
    public tourOperators: MiniProfile[];
    public tourGuests: MiniProfile[];
    public schedules: ScheduleModel[];
    public locationDetail: AutocompleteItem;
    public cost: number;
    public currency: number;
    public header: string;
    public description: string;
    public requirement: string;
    public expectation: string;
    public minParticipant: number;

    constructor() {
        this.tourOperators = new Array<MiniProfile>();
        this.tourGuests = new Array<MiniProfile>();
        this.schedules = new Array<ScheduleModel>();
        this.schedules.push(new ScheduleModel(Utils.getDate(new Date()), { HH: '08', mm: '00' }, { HH: '08', mm: '00' }, Utils.getDate(new Date()), 1));
    }
}