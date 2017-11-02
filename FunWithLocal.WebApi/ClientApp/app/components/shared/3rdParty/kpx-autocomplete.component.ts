// Source: https://github.com/kEpEx/angular2-kpx-autocomplete
// Note: can't import directly due to webpack build fail

import { Component, Input, Output, EventEmitter, SimpleChanges, forwardRef, Renderer, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteItem, SelectedAutocompleteValue } from './kpx-autocomplete.models';
import { ControlValueAccessor,FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { SearchService } from '../../../services/search.service';

@Component({ 
    selector: 'kpx-autocomplete',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => kpxAutocompleteComponent), multi: true },
    ],
    templateUrl: './kpx-autocomplete.component.html'
 })
export class kpxAutocompleteComponent implements ControlValueAccessor {
    @ViewChild("searchBox") searchBox;

    @Input('text-value') 
    set _textValue(value:any){
        this.selected.Description = value;
    }

    @Input('key-value') keyValue :string;
    @Input('param-get-search') paramGetSearch :string = "search";
    @Input('min-chars') minChars :number = 1;
    @Input('placeholder') placeholder :string = "";

    @Input('search-data') searchData: Observable<any>;
    @Input('clear-after-selection') cleanUp: boolean = false;

    @Output('onSelect') onSelect: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();
    @Output() onSearch: EventEmitter<string> = new EventEmitter();

    
    private term = new FormControl();

    private selected :SelectedAutocompleteValue;
    
    private firstSet = true;
    private list : AutocompleteItem[];
    private showList :boolean = false;
    private indexSelected :number = -1;
    private idSelected :string;

    private dontBlur = false;
    
    constructor(public renderer: Renderer) {
        this.selected = new SelectedAutocompleteValue();

         this.term.valueChanges
             .debounceTime(200)
             .subscribe((term) => {
                 if (term && this.indexSelected < 0) {
                     if (term.length >= this.minChars)
                         this.fetch(term);                     
                 }
             });
    }

    ngOnInit(): void { 
        this.list = [];
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['textValue']) {
            this.selected.Description = changes['textValue'].currentValue;
        }
        if(changes['keyValue']) {
            this.selected.Value = changes['keyValue'].currentValue;
        }

        if (changes['searchData']) {
            this.list = changes['searchData'].currentValue;
        }
    }
  

    fetch(search:string):void {
        this.indexSelected = -1;
        this.onSearch.emit(search);
    }

    onFocus() {
        this.showList = true;
    }

    onBlur() {
        setTimeout(()=> {
            if (!this.dontBlur) {
                this.showList = false;
                this.indexSelected = -1;                
            }
        }, 200);
    }

    onKeyDown(event: KeyboardEvent) {
        var key = event.keyCode;
        if(key == 13) {
            this.doSelectIndex(this.indexSelected);
            this.showList = false;
            event.preventDefault();
        }
    }

    onKeyUp(event: KeyboardEvent) {
        this.showList=true;
        var key = event.keyCode;
        if(key == 38 || key == 40 || key == 13) {
            if(key == 13) {
                this.showList = false;
            }
            else {
                if(key == 40) this.indexSelected++;
                else this.indexSelected--;
                this.refreshSelected();
            }
        }        
    }

    doSelectIndex(index:number):void {
        this.indexSelected = index;

        this.selected.Description = `${this.list[this.indexSelected].name}`;
        this.selected.Value = this.list[this.indexSelected].id;

        this.keyValue = this.selected.Value;
        this.onChange(this.list[this.indexSelected]);

        this.onSelect.emit(this.list[this.indexSelected]);

        this.firstSet = false;
        if (this.cleanUp) {
            this.indexSelected = -1;
            this.selected = new SelectedAutocompleteValue();
            this.renderer.invokeElementMethod(this.searchBox.nativeElement, 'focus', []);
        }
    }

    refreshSelected():  void {
        this.list = this.list.filter((d, i)=> {
            if(i == this.indexSelected) d.Selected = true;
            else  d.Selected = false;
            return d;
        });
    }

    onClickOption(item:AutocompleteItem, index:number):void {        
        this.dontBlur = true;

        this.indexSelected = index;
        this.refreshSelected();

        this.doSelectIndex(this.indexSelected);
        this.dontBlur = false;
    }

     /** Implemented as part of ControlValueAccessor. */
    onChange: (value:any) => any = () => {
        
     };

    onTouched: () => any = () => { };

    writeValue(value: any) {
        if(value && value !== '') { 
            this.selected.Description = value.name;
            this.selected.Value = value.id;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    ngOnDestroy() {
        
    }

}