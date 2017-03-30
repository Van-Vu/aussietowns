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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng2_cookies_1 = require("ng2-cookies");
var TourService = (function () {
    function TourService(http) {
        this.http = http;
    }
    TourService.prototype.getAllOffers = function () {
        return this.http.get('/api/tour/offer', this.jwt()).map(function (response) { return response.json(); });
    };
    TourService.prototype.getOfferById = function (_id) {
        return this.http.get('/api/tour/offer/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    TourService.prototype.addOffer = function (tourOffer) {
        return this.http.post('api/tour/offer', tourOffer, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.State == 1) {
                var json = result.Data;
            }
            return result;
        })
            .catch(this.handleError);
    };
    TourService.prototype.updateOffer = function (tourOffer) {
        return this.http.put('api/tour/offer/' + tourOffer.Id, tourOffer, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TourService.prototype.deleteOffer = function (_id) {
        return this.http.delete('/api/tour/offer/' + _id, this.jwt());
    };
    TourService.prototype.getAllRequests = function () {
        return this.http.get('/api/tour/request', this.jwt()).map(function (response) { return response.json(); });
    };
    TourService.prototype.getRequestById = function (_id) {
        return this.http.get('/api/tour/request/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    TourService.prototype.addRequest = function (tourRequest) {
        return this.http.post('api/tour/request', tourRequest, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.State == 1) {
                var json = result.Data;
            }
            return result;
        })
            .catch(this.handleError);
    };
    TourService.prototype.updateRequest = function (tourRequest) {
        return this.http.put('api/tour/request/' + tourRequest.Id, tourRequest, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TourService.prototype.deleteRequest = function (id) {
        return this.http.delete('/api/tour/request/' + id, this.jwt());
    };
    TourService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var token = ng2_cookies_1.Cookie.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.get("token"));
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    TourService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return TourService;
}());
TourService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TourService);
exports.TourService = TourService;
//# sourceMappingURL=tour.service.js.map