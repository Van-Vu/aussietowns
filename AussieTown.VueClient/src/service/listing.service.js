import http from './http-base';
var ListingService = (function () {
    function ListingService() {
        this.baseUrl = '/api/listing/';
        this.getListingByUserUrl = this.baseUrl + '?user=';
        this.getListingBySuburbUrl = this.baseUrl + 'suburb/';
        this.getListingIdByHeaderUrl = this.baseUrl + 'map/';
    }
    ListingService.prototype.getListingById = function (_id) {
        return http.get(this.baseUrl + _id)
            .then(function (response) { return response.data; });
    };
    ListingService.prototype.addListing = function (listing) {
        return http.post(this.baseUrl, listing)
            .then(function (response) {
            var result = response.data;
            if (result.state === 1) {
                return result;
            }
        })
            .catch(this.handleError);
    };
    ListingService.prototype.updateListing = function (listing) {
        return http.put(this.baseUrl + listing.id, listing)
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    ListingService.prototype.deleteListing = function (_id) {
        return http.delete(this.baseUrl + _id);
    };
    ListingService.prototype.getListingsByUserId = function (userId) {
        return http.get(this.getListingByUserUrl + userId)
            .then(function (response) {
            return response.data;
        });
    };
    ListingService.prototype.getListingBySuburb = function (suburbId) {
        return http.get(this.getListingBySuburbUrl + suburbId)
            .then(function (response) {
            return response.data;
        });
    };
    ListingService.prototype.mapListingHeaderToId = function (header) {
        console.log('here in header to Id');
        return http.get(this.getListingIdByHeaderUrl + header)
            .then(function (response) {
            return response.data;
        });
    };
    ListingService.prototype.deleteImage = function (listingId, url) {
        return http.post("" + this.baseUrl + listingId + "/deleteImage", "url=" + url);
    };
    ListingService.prototype.bookAListing = function (bookingRequest) {
        return http.post("" + this.baseUrl + bookingRequest.listingId + "/book", bookingRequest);
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
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return ListingService;
}());
export default ListingService;
