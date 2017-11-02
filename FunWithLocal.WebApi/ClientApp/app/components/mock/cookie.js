"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CookieMock = /** @class */ (function () {
    function CookieMock() {
    }
    CookieMock.check = function (name) { return false; };
    CookieMock.get = function (name) { return ''; };
    CookieMock.getAll = function () { };
    CookieMock.set = function (name, value, expires, path, domain, secure) { };
    CookieMock.delete = function (name, path, domain) { };
    CookieMock.deleteAll = function (path, domain) { };
    return CookieMock;
}());
exports.CookieMock = CookieMock;
//# sourceMappingURL=cookie.js.map