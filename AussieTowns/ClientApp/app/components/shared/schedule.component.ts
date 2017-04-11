import { Component, Input } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'schedule',
    template: require('./schedule.component.html')
})

export class ScheduleComponent {
    @Input('scheduleIntance') model: FormGroup;

    public repeatPeriods = [
        { value: '1', display: 'Daily' },
        { value: '2', display: 'Weekly' },
        { value: '3', display: 'Monthly' }
    ];

    private startDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
        height: '34px',
        width: '250px',
        showTodayBtn: true,
        showClearDateBtn: false,
        markCurrentDay: true
    };

    private endDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
        height: '34px',
        width: '250px',
        showTodayBtn: true,
        showClearDateBtn: false,
        markCurrentDay: true
    };

    constructor(private fb: FormBuilder) { }

    onStartDateChanged(event: IMyDateModel) {
        let d: Date = event.jsdate;

        // set previous of selected date
        d.setDate(d.getDate() - 1);

        // Get new copy of options in order the date picker detect change
        let copy: IMyOptions = JSON.parse(JSON.stringify(this.endDatePickerOptions));
        copy.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.endDatePickerOptions = copy;
    }

    onEndDateChanged(event: IMyDateModel) {
    }

    onStartTimeInput(event) {
        
    }
}