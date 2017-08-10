import http from './http-base';

export default class UploadService {
    private uploadListingUrl = "/api/photo/uploadListing/";
    private uploadProfileUrl = "/api/photo/uploadProfile";

    //uploadListing(formData, listingId, progressCallback) {
    //    return http.post(this.uploadListingUrl,
    //        formData,
    //        progressCallback)
    //        // get data
    //        .then(x => x.data);
    //}

    uploadListing(formData, listingId) {
        return http.post(this.uploadListingUrl + listingId, formData)
            .then(x => x);
    }

    uploadProfile(formData, profileId) {
        return http.post(this.uploadProfileUrl + profileId,formData)
            // get data
            .then(x => x);
    }
}