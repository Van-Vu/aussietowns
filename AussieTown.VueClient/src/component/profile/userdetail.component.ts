import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import VeeValidate from 'vee-validate';
import LocationSearchComponent from "../shared/search/locationsearch.component.vue";
import UserModel from '../../model/user.model';
import ImageModel from '../../model/image.model';


import { UserRole, UserAction, NotificationType } from '../../model/enum';
import { AutocompleteItem } from '../../model/autocomplete.model';
import datepicker from '../shared/external/datepicker.vue';
import { plainToClass } from "class-transformer";
import { Utils } from '../utils'; 
import ImageUploadComponent from '../shared/imageupload.component.vue';

import ImageCropComponent from '../shared/imagecrop.component.vue';

import { GlobalConfig } from '../../GlobalConfig';

import ImageService from '../../service/image.service';

import VueMask from 'v-mask';

Vue.use(VueMask);
Vue.use(VeeValidate);

@Component({
    name: 'UserDetail',
    components: {
        "locationsearch": LocationSearchComponent,
        "datepicker": datepicker,
        "imageupload": ImageUploadComponent,
        "imagecrop": ImageCropComponent
    }
})

export default class UserDetailComponent extends Vue {
    isEditing: boolean = false;
    modelCache: any = null;
    $auth: any;

    get model() {
        return plainToClass<UserModel, Object>(UserModel, this.$store.state.profile);
    }

    static asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    created() {
        if (this.model) {
            //if (this.model.images.length === 0) this.model.images.push(new ImageModel("http://via.placeholder.com/240x240"));
            //if (!this.model.heroImageUrl) this.model.heroImageUrl = "http://via.placeholder.com/1280x320";
        }
    }

    get canEdit() {
        return this.$auth.check(UserRole.Editor, (this.$route.params as any).profileId, UserAction.Edit);
    }

    get isLoggedIn() {
        return this.$store.getters.isLoggedIn;
    }

    onLocationSelected(item: AutocompleteItem) {
        this.model.locationId = +item.id;
    }

    onInsertorUpdate() {
        if (this.model.id > 0) {
            return this.$store.dispatch('UPDATE_USER', this.contructBeforeSubmit(this.model))
                .then (response => {
                    this.$store.dispatch('ADD_NOTIFICATION', { title: "Update Succeed", type: NotificationType.Success });            
                });
        }
    }

    onEdit() {
        this.isEditing = true;
        this.modelCache = Object.assign({}, this.model);
    }

    onCancelEdit() {
        this.isEditing = false;
        Object.assign(this.model, this.modelCache);
        this.modelCache = null;
    }

    contructBeforeSubmit(model) {
        return this.model;
    }

    onEnquire() {
        if (this.isLoggedIn) {
            this.$store.dispatch('SHOW_CONTACT_MODAL',
                {
                    senderId: this.$store.state.loggedInUser.id,
                    receiverId: this.model.id,
                    receiverName: `${this.model.firstName} ${this.model.lastName}`,
                    listingId: null
                });
        } else {
            Utils.handleError(this.$store, { status: 403 });
        }

    }

    onUploadImageCompleted() {
        if (this.canEdit) {
            (this.model as any).imageList = this.$store.state.listing.imageList;
            (this.$children.find(x => x.$el.id === 'imageupload').$children[0] as any).refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
        }
    }

    onReplaceHeroImage() {
        document.getElementById("heroImageUpload").click();
    }

    onUploadHeroImage(fileList) {
        if (!fileList.length) return;
        Array.from(Array(fileList.length).keys())
            .map(x => {
                return (new ImageService()).resizeImage(GlobalConfig.heroImageSize, 
                    {
                        originalFileName: fileList[x].name,
                        originalFile: fileList[x],
                        storeAction: 'UPLOAD_PROFILE_HEROIMAGE',
                        storeActionId: this.$store.state.profile.id
                    }).then(() => this.onUploadImageSuccess());
            });
        (document.getElementById('heroImageUpload') as any).value = null;
    }

    onReplaceProfileImage() {
        document.getElementById("profileImageUpload").click();
    }

    onUploadProfileImage(fileList) {
        if (!fileList.length) return;

        Array.from(Array(fileList.length).keys())
            .map(x => {
                return (new ImageService()).resizeImage(GlobalConfig.profileImageSize,
                {
                    originalFileName: fileList[x].name,
                    originalFile: fileList[x],
                    storeAction: 'UPLOAD_PROFILE_IMAGE',
                    storeActionId: this.$store.state.profile.id
                    }).catch((er) => console.log(er));
            });
        (document.getElementById('profileImageUpload') as any).value = null;
    }

    onUploadImageSuccess() {
        this.$emit('uploadImageCompleted');
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
    }

    onUploadImageFail() {
        this.$emit('uploadImageCompleted');
        this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", type: NotificationType.Error });
    }

onUpdate(){}
capture(){}
}

