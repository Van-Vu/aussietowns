import Vue from "vue";
import { Component, Inject, Watch, Prop } from "vue-property-decorator";
import axios from "axios";
import AutoCompleteComponent from "./autocomplete/autocomplete.vue";
import Test from './test.vue';

//import 'vue-instant/dist/vue-instant.css'
//import VueInstant from './VueInstant.vue'

@Component({
    name: "Hello",
    components: {
        "test": Test,
        "autocomplete": AutoCompleteComponent
    }
})
export default class Hello extends Vue {
    msg: string = "Welcome to Your Vue.js App";
    list: any[] = [];
    searchStr: string = "";
    selectedId: number = 0;
    placeHolderText = "this is the test";

    @Prop value: string = '';
    @Prop suggestionAttribute: string = 'original_title';
    @Prop suggestions: any = [];
    selectedEvent: string = "";

    created(): void {
        //axios
        //    .get("/api/hello")
        //    .then((res) => {
        //      this.msg = res.data.message;
        //    })
        //    .catch((ex) => console.log(ex));
    }

    onLocationSearch(event) {
        var abc = event;
        this.searchStr = event;
        this.list = [{ "id": 1, "name": "test" }, { "id": 2, "name": "test2" }];
    }

    onSelect(val) {
        this.searchStr = val.Description;
        this.selectedId = val.Value;
    }


    clickInput() {
        this.selectedEvent = 'click input';
    }

    clickButton() {
        this.selectedEvent = 'click button';
    }

    selected() {
        this.selectedEvent = 'selection changed';
    }

    enter() {
        this.selectedEvent = 'enter';
    }

    keyUp() {
        this.selectedEvent = 'keyup pressed';
    }

    keyDown() {
        this.selectedEvent = 'keyDown pressed';
    }

    keyRight() {
        this.selectedEvent = 'keyRight pressed';
    }

    clear() {
        this.selectedEvent = 'clear input';
    }

    escape() {
        this.selectedEvent = 'escape';
    }

    changed() {
        var that = this;
        this.suggestions = [];
        axios
            .get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' +
                this.value)
            .then(function(response) {
                response.data.results.forEach(function(a) {
                    that.suggestions.push(a)
                })
            });
    }
}