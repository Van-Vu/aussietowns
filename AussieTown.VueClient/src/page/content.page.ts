import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { NotificationType, ArticleCategory, ArticleStatus } from '../model/enum';
import BlogTemplate from '../component/content/blogTemplate.component.vue';
import IntroductionTemplate from '../component/content/introductionTemplate.component.vue';
import WhatsOnTemplate from '../component/content/whatsontemplate.component.vue';
import DynamicModel from '../model/dynamic.model';

@Component({
    name: 'ContentPage',
    components: {
        'BlogTemplate': BlogTemplate,
        'WhatsOnTemplate': WhatsOnTemplate,
        'IntroductionTemplate': IntroductionTemplate
    },
})

export default class ContentPage extends Vue {
    template: DynamicModel = {
        name: '',
        props: { model: this.model }
    };


    static asyncData({ store, route }) {
        if (route.params.articleId) {
            return store.dispatch('FETCH_ARTICLE_BY_ID', route.params.articleId);
        }
    }

    get model() {
        return this.$store.state.article;
    }

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'content');

        switch (this.model.category) {
            case ArticleCategory.Blog:
                this.template.name = 'BlogTemplate';
                break;
            case ArticleCategory.WhatsOn:
                this.template.name = 'WhatsOnTemplate';
                break;
            case ArticleCategory.Introduction:
                this.template.name = 'IntroductionTemplate';
                break;
        }
    }
}