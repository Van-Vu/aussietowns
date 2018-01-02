import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import MiniProfileComponent from '../shared/miniprofile.component.vue';
import CheckButtonComponent from "../shared/checkbutton.component.vue";
import { Utils } from '../utils';

@Component({
    name: "blogTemplate",
    components: {
        "miniprofile": MiniProfileComponent,
        "checkButton": CheckButtonComponent
    }
})

export default class BlogTemplate extends Vue {
    @Prop() model;

    get fullUrl() {
        return `${Utils.getCurrentHost()}${this.$route.fullPath}`;
    }

    onFacebookShare() {
        Utils.openWindow(
            `http://www.facebook.com/sharer.php?u=${this.fullUrl}&t=${this.model.title}`,
            'toolbar=0,status=0,width=626,height=436');
    }

    onTwitterShare() {
        Utils.openWindow(
            `https://www.twitter.com/intent/tweet?url=${this.fullUrl}&text=${this.model.title}`,
            'toolbar=0,status=0,width=626,height=436');
    }

    onGooglePlusShare() {
        Utils.openWindow(
            `http://plus.google.com/share?url=${this.fullUrl}`,
            'toolbar=0,status=0,width=626,height=436');        
    }
}
