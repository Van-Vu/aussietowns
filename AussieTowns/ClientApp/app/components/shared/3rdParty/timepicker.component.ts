// source: http://ericjgagnon.github.io/wickedpicker/

import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utils } from '../../../shared/utils';

@Component({
    selector: 'timepicker',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true },
    ],
    template: require('./timepicker.component.html')
})

export class TimePickerComponent implements ControlValueAccessor{
    isFullday: boolean= false;
    textValue: string;
    textDisable: boolean = false;

    changeValue(value) {
        if (value) {
            this.onChange("24:00");
            this.textDisable = true;
        } else {
            this.onChange(this.textValue);
            this.textDisable = false;
        }
    }

    onKey(event) {
        this.textValue = event.target.value;
        this.onChange(this.textValue);
    }

    writeValue(value: any) {
        this.textValue = value;
        this.onChange(value);
    }

    /** Implemented as part of ControlValueAccessor. */
    onChange: (value: any) => any = () => {

    };
    onTouched = () => { };
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}