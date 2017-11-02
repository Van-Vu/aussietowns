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
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var cookieFactory_1 = require("../components/mock/cookieFactory");
var MessageService = /** @class */ (function () {
    function MessageService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.baseUrl = '/api/message/';
    }
    MessageService.prototype.send = function (message) {
        return this.http.post(this.baseUrl, message, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                var json = result.data;
            }
            return result;
        })
            .catch(this.handleError);
    };
    MessageService.prototype.deleteMessage = function (messageId) {
        return this.http.delete(this.baseUrl + messageId);
    };
    MessageService.prototype.deleteConversation = function (senderId, recipientId) {
        return this.http.delete(this.baseUrl + 'conversation/' + senderId + '/' + recipientId);
    };
    MessageService.prototype.getConversationsByUser = function (userId) {
        return this.http.get(this.baseUrl + 'user/' + userId, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                var data = result.data;
                return data;
            }
        })
            .catch(this.handleError);
    };
    MessageService.prototype.getConversation = function (senderId, recipientId) {
        return this.http.get(this.baseUrl + 'conversation/' + senderId + '/' + recipientId, this.jwt()).map(function (response) {
            var result = response.json();
            if (result.state == 1) {
                var data = result.data;
                return data;
            }
        })
            .catch(this.handleError);
    };
    MessageService.prototype.handleError = function (error) {
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
    MessageService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var token = cookieFactory_1.CookieFactory.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + cookieFactory_1.CookieFactory.get("token"));
        }
        return new http_1.RequestOptions({ headers: headers });
    };
    MessageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map