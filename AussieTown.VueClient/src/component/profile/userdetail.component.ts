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

Vue.use(VeeValidate);

@Component({
    name: 'UserDetail',
    components: {
        "locationsearch": LocationSearchComponent,
        "datepicker": datepicker,
        "imageupload": ImageUploadComponent
    }
})

export default class UserDetailComponent extends Vue {
    isEditing: boolean = false;
    modelCache: any = null;
    $auth: any;

    get model() {
        return plainToClass<UserModel, Object>(UserModel, this.$store.state.profile);
    }

    asyncData({ store, route }) {
        if (route.params.profileId) {
            return store.dispatch('FETCH_PROFILE_BY_ID', route.params.profileId);
        }
    }

    created() {
        if (this.model) {
            if (this.model.images.length === 0) this.model.images.push(new ImageModel("http://via.placeholder.com/240x240"));
            //if (!this.model.heroImageUrl) this.model.heroImageUrl = "http://via.placeholder.com/1280x320";
        }
    }

    get canEdit() {
        return this.$auth.check(UserRole.Editor, (this.$route.params as any).profileId, UserAction.Edit);
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

    onUploadImageCompleted() {
        if (this.canEdit) {
            (this.model as any).imageList = this.$store.state.listing.imageList;
            (this.$children.find(x => x.$el.id === 'imageupload').$children[0] as any).refresh();
            this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload finish", type: NotificationType.Success });
        }
    }

    onReplaceHeroImage() {
        document.getElementById("fileUpload").click();
    }

    onUploadHeroImage(fileList) {
        if (!fileList.length) return;

        const formData = new FormData();
        Array.from(Array(fileList.length).keys())
            .map(x => {
                formData.append('files', fileList[x], fileList[x].name);
            });

        this.$store.dispatch('UPLOAD_PROFILE_HEROIMAGE',
            {
                data: formData,
                actionId: this.$store.state.profile.id
            }).then(response => {
                this.$emit('uploadImageCompleted');
            })
            .catch(error => {
                this.$store.dispatch('ADD_NOTIFICATION', { title: "Upload error", text: error.message ? error.message : "Error uploading. We're on it !", type: NotificationType.Error });
            });
        (document.getElementById('fileUpload') as any).value = null;
    }

onUpdate(){}
capture(){}
}

