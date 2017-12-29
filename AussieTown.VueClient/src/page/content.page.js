var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ArticleCategory } from '../model/enum';
import BlogTemplate from '../component/content/blogTemplate.component.vue';
import IntroductionTemplate from '../component/content/introductionTemplate.component.vue';
import WhatsOnTemplate from '../component/content/whatsontemplate.component.vue';
var ContentPage = /** @class */ (function (_super) {
    __extends(ContentPage, _super);
    function ContentPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = {
            name: '',
            props: { model: _this.model }
        };
        return _this;
    }
    ContentPage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.articleId) {
            return store.dispatch('FETCH_ARTICLE_BY_ID', route.params.articleId);
        }
    };
    Object.defineProperty(ContentPage.prototype, "model", {
        get: function () {
            return this.$store.state.article;
        },
        enumerable: true,
        configurable: true
    });
    ContentPage.prototype.created = function () {
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
    };
    ContentPage = __decorate([
        Component({
            name: 'ContentPage',
            components: {
                'BlogTemplate': BlogTemplate,
                'WhatsOnTemplate': WhatsOnTemplate,
                'IntroductionTemplate': IntroductionTemplate
            },
        })
    ], ContentPage);
    return ContentPage;
}(Vue));
export default ContentPage;
