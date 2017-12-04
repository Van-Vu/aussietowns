import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { UserRole, UserAction } from '../model/enum';

@Component({
    name: 'ArticlePage'
})

export default class ArticlePage extends Vue {
    articleId: number = 0;
    seoString: string = '';

    //static asyncData({ store, route }) {
    //    if (route.params.articleId) {
    //        return store.dispatch('FETCH_ARTICLE_BY_ID', route.params.articleId);
    //    }
    //}

    created() {
        this.$store.dispatch('SET_CURRENT_PAGE', 'article');
    }
}