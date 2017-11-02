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
var cookieFactory_1 = require("../components/mock/cookieFactory");
var UserService = /** @class */ (function () {
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
            if (result.state == 1) {
                var json = result.data;
                cookieFactory_1.CookieFactory.set("token", json.accessToken);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result;
        })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (user) {
        return this.http.post('api/user/login', { email: user.email, password: user.password }).map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                var json = result.data;
                cookieFactory_1.CookieFactory.set("token", json.accessToken);
                cookieFactory_1.CookieFactory.set("userId", json.userId);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result.data;
        })
            .catch(this.handleError);
    };
    UserService.prototype.getMiniProfile = function (id) {
        return this.http.get('api/user/summary/' + id, this.jwt())
            .map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                return result.data;
            }
            return '';
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUserInfo = function (id) {
        return this.http.get('api/user/' + id, this.jwt())
            .map(function (response) {
            var res = response.json();
            return res.data;
        })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        return this.http.put('api/user/' + user.Id, user, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getToursByUserId = function (id) {
        return this.http.get('api/user/tour/' + id, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (_id) {
        return this.http.delete('/users/' + _id, this.jwt());
    };
    UserService.prototype.search = function (term) {
        return this.http.get('api/user/autocomplete/?search=' + term)
            .map(function (response) { return response.json(); })
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
        var token = cookieFactory_1.CookieFactory.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + cookieFactory_1.CookieFactory.get("token"));
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map