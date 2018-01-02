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
import { NotificationType, ArticleStatus } from '../model/enum';
import ImageService from '../service/image.service';
import ZoneLoadingComponent from '../component/shared/zoneloading.component.vue';
import { GlobalConfig } from '../GlobalConfig';
import InputTag from 'vue-input-tag';
import VueHtml5Editor from 'vue-html5-editor';
Vue.use(VueHtml5Editor, {
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
var ArticlePage = /** @class */ (function (_super) {
    __extends(ArticlePage, _super);
    function ArticlePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEditing = true;
        _this.modelCache = null;
        _this.isImageUploading = false;
        return _this;
    }
    ArticlePage.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.articleId) {
            return store.dispatch('FETCH_ARTICLE_BY_ID', route.params.articleId);
        }
        else {
            return store.dispatch('CREATE_NEW_ARTICLE');
        }
    };
    Object.defineProperty(ArticlePage.prototype, "model", {
        get: function () {
            return this.$store.state.article;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArticlePage.prototype, "canEdit", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    ArticlePage.prototype.created = function () {
        this.modelCache = JSON.parse(JSON.stringify(this.model));
    };
    ArticlePage.prototype.onCancel = function () {
        Object.assign(this.model, this.modelCache);
    };
    ArticlePage.prototype.onPublish = function () {
        this.model.status = ArticleStatus.Publish;
        this.updateStatus();
    };
    ArticlePage.prototype.onArchive = function () {
        this.model.status = ArticleStatus.Archive;
        this.updateStatus();
    };
    ArticlePage.prototype.onSave = function () {
        this.model.status = ArticleStatus.Draft;
        this.updateArticle();
    };
    ArticlePage.prototype.onUpdateContent = function (data) {
        this.model.content = data;
    };
    ArticlePage.prototype.onUpdateTag = function (data) {
        this.model.tagList = data;
    };
    ArticlePage.prototype.updateArticle = function () {
        var _this = this;
        this.$store.dispatch("ENABLE_LOADING");
        this.model.tags = this.model.tagList.join();
        return this.$store.dispatch('UPDATE_ARTICLE_CONTENT', this.model)
            .then(function (response) {
            if (_this.model.id == 0) {
                _this.$store.dispatch('ADD_NOTIFICATION', { title: "Save success", type: NotificationType.Success });
                _this.model.id = response;
            }
            else {
                _this.$store.dispatch('ADD_NOTIFICATION', { title: "Update success", type: NotificationType.Success });
            }
        })
            .catch(function (err) {
        })
            .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
    };
    ArticlePage.prototype.updateStatus = function () {
        var _this = this;
        this.$store.dispatch("ENABLE_LOADING");
        return this.$store.dispatch('UPDATE_ARTICLE_STATUS', { id: this.model.id, status: this.model.status })
            .then(function () {
            _this.$store.dispatch('ADD_NOTIFICATION', { title: "Update success", type: NotificationType.Success });
        })
            .catch(function (err) {
        })
            .then(function () { return _this.$store.dispatch("DISABLE_LOADING"); });
    };
    ArticlePage.prototype.onUploadImage = function (fileList) {
        var _this = this;
        if (!fileList.length)
            return;
        Array.from(Array(fileList.length).keys())
            .map(function (x) {
            _this.isImageUploading = true;
            return (new ImageService()).resizeImage(GlobalConfig.articleImageSize, {
                originalFileName: fileList[x].name,
                originalFile: fileList[x],
                storeAction: 'UPLOAD_ARTICLE_IMAGE',
                storeActionId: _this.$store.state.article.id
            }).then(function () {
                if (!_this.$store.state.isImageCropping) {
                    _this.onUploadImageSuccess();
                }
            })
                .catch(function () { return _this.onUploadImageFail(); })
                .then(function () { return _this.isImageUploading = false; });
        });
        document.getElementById('headImageUpload').value = null;
    };
    ArticlePage.prototype.onReplaceImage = function () {
        document.getElementById("headImageUpload").click();
    };
    ArticlePage.prototype.onUploadImageSuccess = function () {
        this.isImageUploading = false;
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    };
    ArticlePage.prototype.onUploadImageFail = function () {
        this.isImageUploading = false;
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", type: NotificationType.Error });
    };
    ArticlePage = __decorate([
        Component({
            name: 'ArticlePage',
            components: {
                'input-tag': InputTag,
                "zoneloading": ZoneLoadingComponent
            },
        })
    ], ArticlePage);
    return ArticlePage;
}(Vue));
export default ArticlePage;
