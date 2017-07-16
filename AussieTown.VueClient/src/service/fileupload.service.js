import http from './http-base';
var UploadService = (function () {
    function UploadService() {
        this.uploadListingUrl = "/api/photo/uploadListing/";
        this.uploadProfileUrl = "/api/photo/uploadProfile";
    }
    //uploadListing(formData, listingId, progressCallback) {
    //    return http.post(this.uploadListingUrl,
    //        formData,
    //        progressCallback)
    //        // get data
    //        .then(x => x.data);
    //}
    UploadService.prototype.uploadListing = function (formData, listingId) {
        return http.post(this.uploadListingUrl + listingId, formData)
            .then(function (x) { return x.data; });
    };
    UploadService.prototype.uploadProfile = function (formData, profileId) {
        return http.post(this.uploadProfileUrl + profileId, formData)
            .then(function (x) { return x.data; });
    };
    return UploadService;
}());
export default UploadService;
