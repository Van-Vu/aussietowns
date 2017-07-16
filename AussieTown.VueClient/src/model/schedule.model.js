import { RepeatedType, RepeatedDay } from './enum';
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
    ScheduleModel.prototype.summaryText = function () {
        var ret = '';
        switch (this.repeatedType) {
            case RepeatedType.Daily:
                ret = 'Everyday';
                break;
            case RepeatedType.Weekly:
                var repeatedDayname_1 = new Array();
                this.repeatedDay.map(function (day) { return repeatedDayname_1.push(RepeatedDay[day]); });
                ret = "Weekly on " + repeatedDayname_1.join(', ');
                break;
            case RepeatedType.Monthly:
                ret = "Every month on " + new Date(this.startDate).getDay();
                break;
        }
        return ret;
    };
    return ScheduleModel;
}());
export default ScheduleModel;
