import ScheduleModel from './schedule.model';
import { Utils } from '../component/utils';
var ListingModel = (function () {
    function ListingModel() {
        this.tourOperators = new Array();
        this.tourGuests = new Array();
        this.schedules = new Array();
        this.schedules.push(new ScheduleModel(Utils.getDate(new Date()), { HH: '08', mm: '00' }, { HH: '08', mm: '00' }, Utils.getDate(new Date()), 1));
    }
    return ListingModel;
}());
export default ListingModel;
