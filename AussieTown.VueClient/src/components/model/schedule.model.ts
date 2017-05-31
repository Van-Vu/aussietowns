import { RepeatedType } from './enum';

export default class ScheduleModel {
    public id: number;
    public startDate: Date;
    public startTime: Object;
    public duration: Object;
    public endDate: Date;
    public repeatedType: RepeatedType;

    constructor(startDate, startTime, duration, endDate, repeatedType) {
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.repeatedType = repeatedType;
    }
}