import { RepeatedType, RepeatedDay } from './enum';
import { Utils } from '../component/utils';
var ScheduleModel = (function () {
    function ScheduleModel(startDate, startTime, duration, endDate, repeatedType, repeatedDay) {
        this.repeatedDay = new Array();
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.repeatedType = repeatedType;
        this.repeatedDay = repeatedDay;
    }
    Object.defineProperty(ScheduleModel.prototype, "repeatedText", {
        get: function () {
            var ret = Utils.formatDate(new Date(this.startDate));
            switch (this.repeatedType) {
                case RepeatedType.Daily:
                    ret = 'Everyday';
                    break;
                case RepeatedType.Weekly:
                    var repeatedDayname_1 = new Array();
                    if (this.repeatedDay) {
                        this.repeatedDay.map(function (day) { return repeatedDayname_1.push(RepeatedDay[day]); });
                    }
                    if (repeatedDayname_1.length > 0) {
                        ret = "Weekly on " + repeatedDayname_1.join(', ');
                    }
                    else {
                        ret = "Weekly";
                    }
                    break;
                case RepeatedType.Monthly:
                    ret = "Monthly " + new Date(this.startDate).getDay();
                    break;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleModel.prototype, "durationText", {
        get: function () {
            return this.duration + " hrs";
        },
        enumerable: true,
        configurable: true
    });
    return ScheduleModel;
}());
export default ScheduleModel;
