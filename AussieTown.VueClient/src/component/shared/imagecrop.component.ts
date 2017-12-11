import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RingLoader from './external/ringloader.vue';
import { Utils } from '../utils';
import { ImageSize, ResizedImageInfo } from '../../model/imageinfo.model';
import { GlobalConfig } from '../../GlobalConfig';

@Component({
    name: "ImageCropComponent",
    components: {
        "ringloader": RingLoader
    }
})

export default class ImageCropComponent extends Vue {
    @Prop() imageSources: ResizedImageInfo;
    @Prop() imageSizeSettings: ImageSize;

    isHeroImage(): boolean {
        return this.imageSizeSettings.maxWidth > GlobalConfig.listingImageSize.maxWidth;
    }

    mounted() {
        console.log(this.$refs.drag);
        this.dragElement(document.getElementById("imagecrop_draggable"));
    }

    cropAndUpload() {
        const formData = new FormData();

        var topCrop = -(document.getElementById("imagecrop_draggable").offsetTop);
        if (this.isHeroImage()) {
            //100px: the dim div above
            topCrop = (topCrop + 100) * 2;
        }

        return Utils.cropImage(this.imageSources.resizedImage,
        {
            width: this.imageSizeSettings.maxWidth,
            height: this.imageSizeSettings.maxHeight,
            // offsetTop: need negative when positive and vice versa 
            top: topCrop, 
            imageBlob: null
        })
        .then((finalImage: Blob) => {
            this.$store.dispatch("ENABLE_LOADING");

            formData.append('files', finalImage, this.imageSources.originalFileName);

            this.$store.dispatch(this.imageSources.storeAction,
                {
                    data: formData,
                    actionId: this.imageSources.storeActionId
                }).then(response => {
                    this.$store.dispatch("DISABLE_LOADING");
                    this.$store.dispatch("IMAGECROP_FINISH");
                    this.$emit('imageCropCompleted');
                });
        });
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, newTop = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            elmnt.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:

            //if (elmnt.offsetTop - pos2 >= 0) {
            newTop = elmnt.offsetTop - pos2;
            //}
            elmnt.style.top = newTop + "px";

            //if (elmnt.offsetLeft - pos1 >= 0) {
            //    newLeft = elmnt.offsetLeft - pos1;
            //}
            //elmnt.style.left = newLeft + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            elmnt.onmouseup = null;
            elmnt.onmousemove = null;
        }
    }
}
