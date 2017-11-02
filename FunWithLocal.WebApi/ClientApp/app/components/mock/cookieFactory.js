"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_universal_1 = require("angular2-universal");
var ng2_cookies_1 = require("ng2-cookies");
var cookie_1 = require("./cookie");
var CookieFactory = /** @class */ (function () {
    function CookieFactory() {
    }
    CookieFactory.getCookies = function () {
        if (angular2_universal_1.isBrowser) {
            return ng2_cookies_1.Cookie;
        }
        else {
            return cookie_1.CookieMock;
        }
    };
    CookieFactory.check = function (name) {
        return this.getCookies().check(name);
    };
    CookieFactory.get = function (name) { return this.getCookies().get(name); };
    CookieFactory.set = function (name, value, expires, path, domain, secure) {
        return this.getCookies().set(name, value, expires, path, domain, secure);
    };
    CookieFactory.delete = function (name, path, domain) {
        return this.getCookies().delete(name, path, domain);
    };
    CookieFactory.deleteAll = function (path, domain) {
        return this.getCookies().delete(path, domain);
    };
    return CookieFactory;
}());
exports.CookieFactory = CookieFactory;
//# sourceMappingURL=cookieFactory.js.map