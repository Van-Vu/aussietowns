import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import MiniProfileComponent from '../shared/miniprofile.component.vue';


@Component({
    name: "blogTemplate",
    components: {
        "miniprofile": MiniProfileComponent
    }
})

export default class BlogTemplate extends Vue {
    @Prop() model;
}
