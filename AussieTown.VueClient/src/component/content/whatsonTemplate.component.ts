import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
    name: "whatsonTemplate"
})

export default class WhatsOnTemplate extends Vue {
    @Prop() model;
}
