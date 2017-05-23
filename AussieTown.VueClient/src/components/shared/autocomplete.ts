// Source: https://github.com/kEpEx/angular2-kpx-autocomplete
// Note: can't import directly due to webpack build fail

import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import { SelectedAutocompleteValue, AutocompleteItem } from  '../model/autocomplete.model'


@Component({
    name: "AutoComplete"
})
export default class AutoCompleteComponent extends Vue {
    @Prop minChars: number;
    @Prop placeHolderText: string;
    @Prop initialData: AutocompleteItem;
    @Prop cleanUp: boolean;
    @Prop list: AutocompleteItem[];

    //@Output('onSelect') onSelect: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();
    //@Output() onSearch: EventEmitter<string> = new EventEmitter();
    keyword:string = '';

    private selected: SelectedAutocompleteValue = new SelectedAutocompleteValue();

    private firstSet = true;
    //private list: AutocompleteItem[];
    private showList: boolean = false;
    private indexSelected: number = -1;
    private idSelected: string;

    private dontBlur = false;

    created(): void {
    }

    get matches() {
        return this.list;
    }

    onInput(val) {
        if (val && this.indexSelected < 0) {
            if (val.length >= this.minChars)
                this.fetch(val);
        }
    }

    fetch(search: string): void {
        this.indexSelected = -1;
        this.$emit("search", search);
    }

    onFocus() {
        this.showList = true;
    }

    onBlur() {
        setTimeout(() => {
            if (!this.dontBlur) {
                this.showList = false;
                this.indexSelected = -1;
            }
        }, 200);
    }

    onKeyDown(event: KeyboardEvent) {
        var key = event.keyCode;
        if (key == 13) {
            this.doSelectIndex(this.indexSelected);
            this.showList = false;
            event.preventDefault();
        }
    }

    onKeyUp(event: KeyboardEvent) {
        this.showList = true;
        var key = event.keyCode;
        if (key == 38 || key == 40 || key == 13) {
            if (key == 13) {
                this.showList = false;
            } else {
                if (key == 40) {
                    this.indexSelected++;
                    if (this.indexSelected >= this.list.length) this.indexSelected = 0;
                } else {
                    this.indexSelected--;
                    if (this.indexSelected < 0) this.indexSelected = this.list.length - 1;
                }
                this.refreshSelected();
            }
        }
    }

    doSelectIndex(index: number): void {
        this.indexSelected = index;

        this.selected.Description = `${this.list[this.indexSelected].name}`;
        this.selected.Value = this.list[this.indexSelected].id;

        this.$emit("select", this.list[this.indexSelected]);

        this.firstSet = false;
	this.keyword = this.selected.Description;
        if (this.cleanUp) {
            this.indexSelected = -1;
            this.selected = new SelectedAutocompleteValue();
        }
    }

    refreshSelected(): void {
        this.list = this.list.filter((d, i) => {
            if (i == this.indexSelected) d.selected = true;
            else d.selected = false;
            return d;
        });
    }

    onClickOption(item: AutocompleteItem, index: number): void {
        this.dontBlur = true;

        this.indexSelected = index;
        this.refreshSelected();

        this.doSelectIndex(this.indexSelected);
        this.dontBlur = false;
    }
}