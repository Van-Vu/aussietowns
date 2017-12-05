//https://github.com/websanova/vue-upload

<template>
    <div>
        <div class="upload-image" v-for="image in uploadedFiles" data-content="progress">
            <span v-if="image.progress < 100">
                <progress max="100" :value="image.progress" class="progress is-medium">{{image.progress}}</progress>
            </span>
            <img :src="image.src" />
            <i class="icon icon-trash" v-if="image.progress >= 100"@click="removeImage"></i>
        </div>
        <form v-if="isUploadImageAllowed" enctype="multipart/form-data" novalidate>
            <div class="dropbox">
                <input id="uploadZone" type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
                <p>
                    Drag your file(s) here to begin<br> or click to browse
                </p>
                <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                </p>
            </div>
        </form>
        <div v-else class="limit-warning">
            <span>You've reached the limit of {{maxFileConfig}} images</span>
        </div>
    </div>
</template>

<script>
    import { GlobalConfig } from '../../../GlobalConfig';

    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

    export default {
        name: 'VueUploadImage',
        props: {
            maxFileAllowed: {
                type: Number,
                default: 0
            },
            maxFileConfig: {                
                type: Number,
                default: 0
            }
        },
        data: function(){
            return {
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'files'
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            },
            isUploadImageAllowed() {
                return this.maxFileAllowed > 0;
            }
        },
        mounted: function(){
            this.reset();
        },
        methods: {
            removeImage(){
            },
            reset() {
                // reset form to initial state
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            setProgress(progressEvent, formData){
                // Bodom hack: total size of XMLHttpRequestUpload vs FileReader doesn't match exactly
                let image = this.uploadedFiles.find(x => (x.total + 100 < progressEvent.total) && (x.total + 400 > progressEvent.total));
                image.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            },

            save(formData) {
                // upload data to the server
                //this.currentStatus = STATUS_SAVING;

                //upload(formData, {
                //    onUploadProgress:(progressEvent, formData) => {
                //        this.setProgress(progressEvent, formData);
                //    }
                //})
                //.then(x => {
                //    //this.createImage(x);
                //    //this.uploadedFiles.push(x);
                //    this.currentStatus = STATUS_SUCCESS;
                //})
                //.catch(err => {
                //    this.uploadError = err.response;
                //    console.log(`fail ${err.response}`);
                //    this.currentStatus = STATUS_FAILED;
                //});
            },
            createImage(file) {
                var reader = new FileReader();

                reader.onload = (e) => {
                    this.uploadedFiles.push({src: e.target.result, progress: 0, total: e.total});
                    //this.save(e.target.result);
                };

                reader.readAsDataURL(file);
            },
            filesChange(fieldName, fileList) {
                if (!fileList.length) return;
                if (fileList.length > this.maxFileAllowed) return;

                //// append the files to FormData
                //const formData = new FormData();

                //Array
                //.from(Array(fileList.length).keys())
                //.map(x => {
                //    // handle file changes
                //    formData.append(fieldName, fileList[x], fileList[x].name);

                //    //this.createImage(fileList[x]);

                //    var test = "asdfasdfa";
                    
                //    // save it
                //    //this.save(formData);

                //    //resizeImage({
                //    //    file: $image.fileList[x],
                //    //    maxSize: 500
                //    //}).then(function (resizedImage) {
                //    //    console.log("upload resized image")
                //    //    formData.append(fieldName, resizedImage[x], resizedImage[x].name);
                //    //}).catch(function (err) {
                //    //    console.error(err);
                //    //});

                //});

                this.$emit('uploadImages', fileList);

                // bodom hack: reset input zone for second time
                document.getElementById('uploadZone').value = null;
            }
        }
    }
</script>

<style lang="scss">
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: #B6BABC;
        color: dimgray;
        min-height: 50px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 10px 0;
    }

    .upload-image {
        position: relative;
        border: 1px solid rgb(153,205,78);
        padding: 10px 10px;
        margin: 10px;
        box-shadow: inset 0px 0px 20px rgb(153,205,78);

        & > span {
            position: absolute;
            width: 100%; height:100%;
            top:0; left:0;
            background:rgba(0,0,0,0.6);

            & > progress {
                position: absolute;
                z-index: 5;
                bottom: 50%;
            }
        }

        & > i {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 2rem;
        }
    }

    .upload-image img {
        width: 100%;
        vertical-align: top;
    }

    .limit-warning {
        background: #FCD116;
        text-align: center;
    }
</style>