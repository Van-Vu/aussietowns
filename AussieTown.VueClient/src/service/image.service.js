import { Utils } from '../component/utils';
import store from '../store';
var ImageService = /** @class */ (function () {
    function ImageService() {
        this.getConversationByUserIdUrl = 'api/message/user/';
        this.getMessagesByConversationIdUrl = 'api/message/conversation/';
        this.sendMessageUrl = 'api/message/conversation';
    }
    ImageService.prototype.resizeImage = function (imageSizeSettings, imageInfo) {
        var _this = this;
        return Utils.resizeImage(imageSizeSettings, imageInfo.originalFile).then(function (images) {
            console.log("upload resized image");
            if (images.resizedImage.height > imageSizeSettings.maxHeight ||
                images.resizedImage.width > imageSizeSettings.maxWidth) {
                images.originalFileName = imageInfo.originalFileName;
                images.storeAction = imageInfo.storeAction;
                images.storeActionId = imageInfo.storeActionId;
                return store.dispatch('SHOW_IMAGECROP_MODAL', { images: images, setting: imageSizeSettings });
            }
            else {
                return _this.uploadImage(images.resizedImage.imageBlob, imageInfo);
            }
            //formData.append('files', resizedImage, fileName);
            //this.$store.dispatch('UPLOAD_PROFILE_HEROIMAGE',
            //    {
            //        data: formData,
            //        actionId: this.$store.state.profile.id
            //    }).then(response => {
            //        this.$emit('uploadImageCompleted');
            //    });
        }).catch(function (err) {
            console.error(err);
        });
    };
    ImageService.prototype.uploadImage = function (imageBlob, imageInfo) {
        var formData = new FormData();
        formData.append('files', imageBlob, imageInfo.originalFileName);
        return store.dispatch(imageInfo.storeAction, {
            data: formData,
            actionId: imageInfo.storeActionId
        });
    };
    return ImageService;
}());
export default ImageService;
