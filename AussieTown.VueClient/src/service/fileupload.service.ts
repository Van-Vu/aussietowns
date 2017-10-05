import http from './http-base';

export default class UploadService {
    private uploadListingUrl = "/api/listing/";
    private uploadProfileUrl = "/api/user/";

    uploadListing(formData, listingId) {
        return http.post(`${this.uploadListingUrl}${listingId}/addImage`, formData)
            .then(x => x);
    }

    uploadProfileImage(formData, profileId) {
        return http.post(`${this.uploadProfileUrl}${profileId}/addImage`,formData)
            // get data
            .then(x => x);
    }

    uploadProfileHeroImage(formData, profileId) {
        return http.post(`${this.uploadProfileUrl}${profileId}/addHeroImage`, formData)
            // get data
            .then(x => x);
    }
}