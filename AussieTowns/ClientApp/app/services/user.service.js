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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get('/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (_id) {
        return this.http.get('/users/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post('api/user/register', user, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.State == 1) {
                var json = result.Data;
                ng2_cookies_1.Cookie.set("token", json.accessToken);
            }
            return result;
        })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (user) {
        return this.http.post('api/user/login', { email: user.Email, password: user.Password }, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.State == 1) {
                var json = result.Data;
                ng2_cookies_1.Cookie.set("token", json.accessToken);
            }
            return result;
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUserInfo = function (id) {
        return this.http.get('api/user/info/' + id, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        return this.http.put('api/user/' + user.Id, user, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (_id) {
        return this.http.delete('/users/' + _id, this.jwt());
    };
    UserService.prototype.search = function (term) {
        return this.http.get('api/user/search/?term=' + term)
            .map(function (response) {
            var data = response.json();
            return data.Data;
        })
            .catch(this.handleError);
    };
    // private helper methods
    UserService.prototype.upload = function (fileToUpload) {
        var input = new FormData();
        input.append("file", fileToUpload);
        return this.http
            .post("/api/user/profileimage", input);
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var token = ng2_cookies_1.Cookie.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.get("token"));
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map