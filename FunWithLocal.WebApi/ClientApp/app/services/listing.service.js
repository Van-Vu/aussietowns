"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng2_cookies_1 = require("ng2-cookies");
var ListingService = /** @class */ (function () {
    function ListingService(http) {
        this.http = http;
        this.baseUrl = '/api/listing/';
        this.getListingByUserUrl = this.baseUrl + '?user=';
        this.getListingBySuburbUrl = this.baseUrl + 'suburb/';
    }
    ListingService.prototype.getListingById = function (_id) {
        return this.http.get(this.baseUrl + _id).map(function (response) {
            var result = response.json();
            return result.data;
        });
    };
    ListingService.prototype.addListing = function (listing) {
        return this.http.post(this.baseUrl, listing, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                var json = result.data;
            }
            return result;
        })
            .catch(this.handleError);
    };
    ListingService.prototype.updateListing = function (listing) {
        return this.http.put(this.baseUrl + listing.id, listing)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ListingService.prototype.deleteListing = function (_id) {
        return this.http.delete(this.baseUrl + _id);
    };
    ListingService.prototype.getListingsByUserId = function (userId) {
        return this.http.get(this.getListingByUserUrl + userId, this.jwt()).map(function (response) { return response.json().data; });
    };
    ListingService.prototype.getListingBySuburb = function (suburbId) {
        return this.http.get(this.getListingBySuburbUrl + suburbId).map(function (response) { return response.json().data; });
    };
    ListingService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var token = ng2_cookies_1.Cookie.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.get("token"));
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    ListingService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ListingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ListingService);
    return ListingService;
}());
exports.ListingService = ListingService;
//# sourceMappingURL=listing.service.js.map