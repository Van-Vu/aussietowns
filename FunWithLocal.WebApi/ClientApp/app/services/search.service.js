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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
//import { SuburbDetails } from '../model/suburbDetails';
var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this.searchUrl = '/api/search'; // URL to web API
        this.detailUrl = '/api/search/detail/'; // URL to web API
        this.autoCompleteUrl = '/api/search/autocomplete/?search='; // URL to web API
    }
    SearchService.prototype.getSuburbs = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var data = new http_1.URLSearchParams();
        data.append('topleftlat', '1');
        data.append('topleftlong', '1');
        data.append('bottomrightlat', '1');
        data.append('bottomrightlong', '1');
        var body = data.toString();
        return this.http.post(this.searchUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //// Bodom
    //getSuburbDetails(postCode): Observable<SuburbDetails> {
    //    return this.http.get(this.detailUrl + postCode)
    //        .map(response => response.json())
    //        .catch(this.handleError);
    //}
    SearchService.prototype.autoComplete = function (term) {
        return this.http.get(this.autoCompleteUrl + term)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SearchService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        //let errMsg: string;
        //if (error instanceof Response) {
        //    const body = error.json() || '';
        //    const err = body.error || JSON.stringify(body);
        //    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        //} else {
        //    errMsg = error.message ? error.message : error.toString();
        //}
        //console.error(errMsg);
        //alert('there error');
        return Observable_1.Observable.throw('something wrong !');
    };
    SearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map