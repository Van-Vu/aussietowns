import http from './http-base';

export default class UploadService {
    private uploadListingUrl = "/api/listing/";
    private uploadProfileUrl = "/api/user/";
    private uploadArticleUrl = "/api/article/";

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

    uploadArticleImage(formData, articleId) {
        return http.post(`${this.uploadArticleUrl}${articleId}/addImage`, formData)
            .then(x => x);
    }
}