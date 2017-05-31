var ScheduleModel = (function () {
    function ScheduleModel(startDate, startTime, duration, endDate, repeatedType) {
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.repeatedType = repeatedType;
    }
    return ScheduleModel;
}());
export default ScheduleModel;
