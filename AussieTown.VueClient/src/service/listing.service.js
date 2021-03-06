import http from './http-base';
var ListingService = /** @class */ (function () {
    function ListingService() {
        this.baseUrl = '/api/listing/';
        this.getListingByUserUrl = this.baseUrl + '?user=';
        this.getListingBySuburbUrl = this.baseUrl + 'suburb/';
        this.getFeatureListingsUrl = this.baseUrl + 'feature';
    }
    ListingService.prototype.getListingById = function (_id) {
        return http.get(this.baseUrl + _id)
            .then(function (response) { return response; });
    };
    ListingService.prototype.getListingWithBookingDetailById = function (id) {
        return http.get(this.baseUrl + id + "/booking")
            .then(function (response) { return response; });
    };
    ListingService.prototype.addListing = function (listing) {
        return http.post(this.baseUrl, listing)
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ListingService.prototype.updateListing = function (listing) {
        return http.post(this.baseUrl + listing.id, listing)
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    ListingService.prototype.deleteListing = function (_id) {
        return http.delete(this.baseUrl + _id);
    };
    ListingService.prototype.getListingsByUserId = function (userId) {
        return http.get(this.getListingByUserUrl + userId)
            .then(function (response) { return response; });
    };
    ListingService.prototype.getListingBySuburb = function (suburbId) {
        return http.get(this.getListingBySuburbUrl + suburbId)
            .then(function (response) { return response; });
    };
    ListingService.prototype.getFeatureListings = function () {
        return http.get(this.getFeatureListingsUrl)
            .then(function (response) { return response; });
    };
    ListingService.prototype.deleteImage = function (listingId, url) {
        return http.post("" + this.baseUrl + listingId + "/deleteImage", "url=" + url);
    };
    ListingService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        //let token = Cookie.check("token");
        //if (token) {
        //    headers.append('Authorization', 'Bearer ' + Cookie.get("token"));
        //}
        //return new RequestOptions({ headers: headers });
        return '';
    };
    ListingService.prototype.handleError = function (error) {
        console.error('Bodom An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return ListingService;
}());
export default ListingService;
