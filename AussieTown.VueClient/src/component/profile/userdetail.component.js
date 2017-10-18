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
import VeeValidate from 'vee-validate';
import LocationSearchComponent from "../shared/search/locationsearch.component.vue";
import UserModel from '../../model/user.model';
import { UserRole, UserAction, NotificationType } from '../../model/enum';
import datepicker from '../shared/external/datepicker.vue';
import { plainToClass } from "class-transformer";
import ImageUploadComponent from '../shared/imageupload.component.vue';
Vue.use(VeeValidate);
var UserDetailComponent = /** @class */ (function (_super) {
    __extends(UserDetailComponent, _super);
    function UserDetailComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEditing = false;
        _this.modelCache = null;
        return _this;
    }
    Object.defineProperty(UserDetailComponent.prototype, "model", {
        get: function () {
            return plainToClass(UserModel, this.$store.state.profile);
        },
        enumerable: true,
        configurable: true
    });
    UserDetailComponent.prototype.asyncData = function (_a) {
        var store = _a.store, route = _a.route;
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    };
    UserDetailComponent.prototype.created = function () {
        if (this.model) {
            //if (this.model.images.length === 0) this.model.images.push(new ImageModel("http://via.placeholder.com/240x240"));
            //if (!this.model.heroImageUrl) this.model.heroImageUrl = "http://via.placeholder.com/1280x320";
        }
    };
    Object.defineProperty(UserDetailComponent.prototype, "canEdit", {
        get: function () {
            return this.$auth.check(UserRole.Editor, this.$route.params.profileId, UserAction.Edit);
        },
        enumerable: true,
        configurable: true
    });
    UserDetailComponent.prototype.onLocationSelected = function (item) {
        this.model.locationId = +item.id;
    };
    UserDetailComponent.prototype.onInsertorUpdate = function () {
        var _this = this;
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_USER', this.contructBeforeSubmit(this.model))
                .then(function (response) {
                _this.$store.dispatch('ADD_NOTIFICATION', { title: "Update Succeed", type: NotificationType.Success });
            });
        }
    };
    UserDetailComponent.prototype.onEdit = function () {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
    };
    UserDetailComponent.prototype.onCancelEdit = function () {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
    };
    UserDetailComponent.prototype.contructBeforeSubmit = function (model) {
        return this.model;
    };
    UserDetailComponent.prototype.onUploadImageCompleted = function () {
        if (this.canEdit) {
            this.model.imageList = this.$store.state.listing.imageList;
            this.$children.find(function (x) { return x.$el.id === 'imageupload'; }).$children[0].refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
        }
    };
    UserDetailComponent.prototype.onReplaceHeroImage = function () {
        document.getElementById("fileUpload").click();
    };
    UserDetailComponent.prototype.onUploadHeroImage = function (fileList) {
        var _this = this;
        if (!fileList.length)
            return;
        var formData = new FormData();
        Array.from(Array(fileList.length).keys())
            .map(function (x) {
            formData.append('files', fileList[x], fileList[x].name);
        });
        this.$store.dispatch('UPLOAD_PROFILE_HEROIMAGE', {
            data: formData,
            actionId: this.$store.state.profile.id
        }).then(function (response) {
            _this.$emit('uploadImageCompleted');
        });
        document.getElementById('fileUpload').value = null;
    };
    UserDetailComponent.prototype.onReplaceProfileImage = function () {
        document.getElementById("profileImageUpload").click();
    };
    UserDetailComponent.prototype.onUploadProfileImage = function (fileList) {
        var _this = this;
        if (!fileList.length)
            return;
        var formData = new FormData();
        Array.from(Array(fileList.length).keys())
            .map(function (x) {
            formData.append('files', fileList[x], fileList[x].name);
        });
        this.$store.dispatch('UPLOAD_PROFILE_IMAGE', {
            data: formData,
            actionId: this.$store.state.profile.id
        }).then(function (response) {
            _this.$emit('uploadImageCompleted');
        });
        document.getElementById('profileImageUpload').value = null;
    };
    UserDetailComponent.prototype.onUpdate = function () { };
    UserDetailComponent.prototype.capture = function () { };
    UserDetailComponent = __decorate([
        Component({
            name: 'UserDetail',
            components: {
                "locationsearch": LocationSearchComponent,
                "datepicker": datepicker,
                "imageupload": ImageUploadComponent
            }
        })
    ], UserDetailComponent);
    return UserDetailComponent;
}(Vue));
export default UserDetailComponent;
