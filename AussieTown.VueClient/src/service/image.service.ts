import http from './http-base';
import { Utils } from '../component/utils';
import { ImageInfo, ResizedImageInfo, UploadImageInfo, ImageSize } from '../model/imageinfo.model';

import store from '../store';

export default class ImageService {
    private getConversationByUserIdUrl = 'api/message/user/';
    private getMessagesByConversationIdUrl = 'api/message/conversation/';
    private sendMessageUrl = 'api/message/conversation';

    resizeImage(imageSizeSettings: ImageSize, imageInfo: UploadImageInfo) {
        return Utils.resizeImage(imageSizeSettings, imageInfo.originalFile).then((images: ResizedImageInfo) => {
            console.log("upload resized image");
            if (images.resizedImage.height > imageSizeSettings.maxHeight ||
                images.resizedImage.width > imageSizeSettings.maxWidth) {

                images.originalFileName = imageInfo.originalFileName;
                images.storeAction = imageInfo.storeAction;
                images.storeActionId = imageInfo.storeActionId;
                return store.dispatch('SHOW_IMAGECROP_MODAL', { images: images, setting: imageSizeSettings });
            } else {
                return this.uploadImage(images.resizedImage.imageBlob,imageInfo);
            }
            //formData.append('files', resizedImage, fileName);

            //this.$store.dispatch('UPLOAD_PROFILE_HEROIMAGE',
            //    {
            //        data: formData,
            //        actionId: this.$store.state.profile.id
            //    }).then(response => {
            //        this.$emit('uploadImageCompleted');
            //    });
        }).catch((err) => {
            console.error(err);
        });
    }

    uploadImage(imageBlob: Blob, imageInfo: UploadImageInfo) {
        const formData = new FormData();

        formData.append('files', imageBlob, imageInfo.originalFileName);

        return store.dispatch(imageInfo.storeAction,
            {
                data: formData,
                actionId: imageInfo.storeActionId
            });
    }
}