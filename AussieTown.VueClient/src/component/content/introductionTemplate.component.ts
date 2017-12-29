import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "introductionTemplate"
})

export default class IntroductionTemplate extends Vue {
    @Prop() model;
}
