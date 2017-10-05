import http from './http-base';
var UploadService = /** @class */ (function () {
    function UploadService() {
        this.uploadListingUrl = "/api/listing/";
        this.uploadProfileUrl = "/api/user/";
    }
    UploadService.prototype.uploadListing = function (formData, listingId) {
        return http.post("" + this.uploadListingUrl + listingId + "/addImage", formData)
            .then(function (x) { return x; });
    };
    UploadService.prototype.uploadProfileImage = function (formData, profileId) {
        return http.post("" + this.uploadProfileUrl + profileId + "/addImage", formData)
            .then(function (x) { return x; });
    };
    UploadService.prototype.uploadProfileHeroImage = function (formData, profileId) {
        return http.post("" + this.uploadProfileUrl + profileId + "/addHeroImage", formData)
            .then(function (x) { return x; });
    };
    return UploadService;
}());
export default UploadService;
