import { RepeatedType, RepeatedDay } from './enum';

export default class ScheduleModel {
    id: number;
    startDate: string;
    startTime: Object;
    duration: Object;
    endDate: string;
    repeatedType: RepeatedType;
    repeatedDay: RepeatedDay[] = new Array<RepeatedDay>();

    constructor(startDate, startTime, duration, endDate, repeatedType, repeatedDay) {
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.repeatedType = repeatedType;
        this.repeatedDay = repeatedDay;
    }

    summaryText() {
        let ret = '';
        
        switch (this.repeatedType) {
            case RepeatedType.Daily:
                ret = 'Everyday';
                break;
            case RepeatedType.Weekly:
                let repeatedDayname = new Array<string>();
                if (this.repeatedDay) {
                    this.repeatedDay.map(day => repeatedDayname.push(RepeatedDay[day]));    
                }

                if (repeatedDayname.length > 0) {
                    ret = `Weekly on ${repeatedDayname.join(', ')}`;
                } else {
                    ret = `Weekly`;  
                }
                break;
            case RepeatedType.Monthly:
                ret = `Monthly ${new Date(this.startDate).getDay()}`;
                break;
        }

        return ret;
    }
}