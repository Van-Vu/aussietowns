import { Directive, forwardRef, Input, NgModule, Provider } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextMaskMock),
    multi: true
}

@Directive({
    selector: '[textMask]',
    providers: [MASKEDINPUT_VALUE_ACCESSOR]
})

export class TextMaskMock {
    @Input('textMask') textMask: any;

    writeValue(value: any) {}

    registerOnChange(fn: any) {}

    registerOnTouched(fn: any) {}

    setDisabledState(isDisabled: boolean) {}
}

@NgModule({
    declarations: [TextMaskMock],
    exports: [TextMaskMock]
})
export class TextMaskMockModule { }
