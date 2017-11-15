export interface ImageSize {
    maxWidth: number;
    maxHeight: number;
}

export interface ResizedImageInfo extends UploadImageInfo {
    resizedImage: ImageInfo; // resize to fit the imagetype
    cropImage: ImageInfo; // fake image just used to crop
}

export interface UploadImageInfo {
    originalFileName: string;
    originalFile: File;
    storeAction: string; // upload_heroimage, upload_profileimage, upload_listingimage
    storeActionId: number; // profileId, listingId    
}

export interface ImageInfo {
    top: number;
    width: number;
    height: number;
    imageBlob: Blob;
}