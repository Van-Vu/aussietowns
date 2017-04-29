import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
    name: "Test"
})
export default class Test extends Vue {
    msg: string = "Hello Bodom";

    created(): void {
        this.msg= "asdfasdfa";
    }
}
