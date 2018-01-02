import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { NotificationType, ArticleCategory, ArticleStatus } from '../model/enum';
import BlogTemplate from '../component/content/blogTemplate.component.vue';
import IntroductionTemplate from '../component/content/introductionTemplate.component.vue';
import WhatsOnTemplate from '../component/content/whatsontemplate.component.vue';
import DynamicModel from '../model/dynamic.model';
import { Utils } from '../component/utils';

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

    public metaInfo(): any {
        return {
            meta: [
                { vmid: 'description', name: 'description', content: this.model.sanitizedContent },
                { vmid: 'ogtitle', property: 'og:title', content: `${this.model.title} in the topic of ${this.model.tagList.join(', ')}` },
                { vmid: 'ogurl', property: 'og:url', content: `${Utils.getCurrentHost()}${this.$route.fullPath}` },
                { vmid: 'ogtype', property: 'og:type', content: 'article' },
                { vmid: 'ogdescription', property: 'og:description', content: this.model.sanitizedContent },
                { vmid: 'ogimage', property: 'og:image', content: this.model.imageUrl },
                { vmid: 'ogimagewidth', property: 'og:image:width', content: "630" },
                { vmid: 'ogimageheight', property: 'og:image:height', content: "355" },

                { vmid: 'twittertitle', property: 'twitter:title', content: `${this.model.title} in the topic of ${this.model.tagList.join(', ')}` },
                { vmid: 'twitterdescription', property: 'twitter:description', content: this.model.sanitizedContent },
                { vmid: 'twitterimage', property: 'twitter:image', content: this.model.imageUrl }
            ],
            title: `${this.model.title} in the topic of ${this.model.tagList.join(', ')}`,
        };
    }
}