import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { NotificationType, ArticleCategory, ArticleStatus } from '../model/enum';
import BlogTemplate from '../component/article/blogTemplate.component.vue';
import IntroductionTemplate from '../component/article/introductionTemplate.component.vue';
import WhatsOnTemplate from '../component/article/whatsontemplate.component.vue';
import ImageService from '../service/image.service';

import ZoneLoadingComponent from '../component/shared/zoneloading.component.vue';

import ArticleModel from '../model/article.model';
import { GlobalConfig } from '../GlobalConfig';

import InputTag from 'vue-input-tag';

import VueHtml5Editor from 'vue-html5-editor';
Vue.use(VueHtml5Editor,
    {
        showModuleName: false,
        icons: {
            text: "icon-pencil",
            color: "icon-paint-brush",
            font: "icon-font",
            align: "icon-bars",
            list: "icon-list",
            link: "icon-link",
            unlink: "icon-chain-broken",
            tabulation: "icon-table",
            image: "icon-file-image-o",
            hr: "icon-minus-circle",
            eraser: "icon-eraser",
            undo: "icon-undo",
            "full-screen": "icon-arrows-alt",
            info: "icon-info-circle",
        },
        hiddenModules: ["hr"]
    });    


@Component({
    name: 'ArticlePage',
    components: {
        'input-tag': InputTag,
        "zoneloading": ZoneLoadingComponent
    },
})

export default class ArticlePage extends Vue {
    isEditing: boolean = true;
    modelCache: ArticleModel = null;
    isImageUploading: boolean = false;


    static asyncData({ store, route }) {
        if (route.params.articleId) {
            return store.dispatch('FETCH_ARTICLE_BY_ID', route.params.articleId);
        } else {
            return store.dispatch('CREATE_NEW_ARTICLE');
        }
    }

    get model() {
        return this.$store.state.article;
    }

    get isNew() {
        return !(this.model && this.model.id > 0);
    }

    created() {
        this.modelCache = JSON.parse(JSON.stringify(this.model));
    }

    onCancel() {
        Object.assign(this.model, this.modelCache);
    }

    onPublish() {
        this.model.status = ArticleStatus.Publish;
        this.updateStatus();
    }

    onArchive() {
        this.model.status = ArticleStatus.Archive;
        this.updateStatus();
    }

    onSave() {
        //this.model.status = ArticleStatus.Draft;
        this.updateArticle();
    }

    onUpdateContent(data) {
        this.model.content  = data;
    }

    onUpdateTag(data) {
        this.model.tagList = data;
    }

    updateArticle() {
        this.$store.dispatch("ENABLE_LOADING");

        this.model.tags = this.model.tagList.join();

        return this.$store.dispatch('UPDATE_ARTICLE_CONTENT', this.model)
            .then((response) => {
                if (this.model.id && this.model.id > 0) {
                    this.$store.dispatch('ADD_NOTIFICATION', { title: "Update success", type: NotificationType.Success });    
                } else {
                    this.$store.dispatch('ADD_NOTIFICATION', { title: "Save success", type: NotificationType.Success });
                    this.$store.dispatch('UPDATE_ARTICLE_ID', { id: response });
                    //this.model.id = response;
                }
            })
            .catch(err => {
            })
            .then(() => this.$store.dispatch("DISABLE_LOADING"));
    }

    updateStatus() {
        this.$store.dispatch("ENABLE_LOADING");
        return this.$store.dispatch('UPDATE_ARTICLE_STATUS', { id: this.model.id, status: this.model.status })
            .then(() => {
                this.$store.dispatch('ADD_NOTIFICATION',
                    { title: "Update success", type: NotificationType.Success });
            })
            .catch(err => {
            })
            .then(() => this.$store.dispatch("DISABLE_LOADING"));        
    }

    onUploadImage(fileList) {
        if (!fileList.length) return;
        Array.from(Array(fileList.length).keys())
            .map(x => {
                this.isImageUploading = true;
                return (new ImageService()).resizeImage(GlobalConfig.articleImageSize,
                    {
                        originalFileName: fileList[x].name,
                        originalFile: fileList[x],
                        storeAction: 'UPLOAD_ARTICLE_IMAGE',
                        storeActionId: this.$store.state.article.id
                    }).then(() => {
                        if (!this.$store.state.isImageCropping) {
                            this.onUploadImageSuccess();
                        }
                    })
                    .catch(() => this.onUploadImageFail())
                    .then(() => this.isImageUploading = false);
            });
        (document.getElementById('headImageUpload') as any).value = null;
    }

    onReplaceImage() {
        document.getElementById("headImageUpload").click();
    }

    onUploadImageSuccess() {
        this.isImageUploading = false;
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    }

    onUploadImageFail() {
        this.isImageUploading = false;
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", type: NotificationType.Error });
    }
}