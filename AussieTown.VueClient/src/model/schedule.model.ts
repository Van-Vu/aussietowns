import { RepeatedType, RepeatedDay } from './enum';
import { Utils } from '../component/utils';

export default class ScheduleModel {
    id: number;
    startDate: string;
    startTime: string;
    duration: Object;
    endDate: string;
    repeatedType: RepeatedType;
    repeatedDay: Array<string>;

    constructor(startDate, startTime, duration, endDate, repeatedType, repeatedDay) {
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.repeatedType = repeatedType;
        this.repeatedDay = repeatedDay;
    }

    get repeatedText(): string {
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
                ret = `Monthly on ${new Date(this.startDate).getDay()}`;
                break;
            default:
                ret = Utils.formatDate(new Date(this.startDate));
        }

        return ret;
    }

    get durationText(): string {
        return this.duration ? `${this.duration} hrs` : '';
    }

    get dateRange() {
        return [this.startDate, this.endDate];
    }

    set dateRange(value: Array<string>) {
        if (Array.isArray(value)) {
            this.startDate = value[0];
            this.endDate = value[1];
        }
    }
}