"use strict";
// Bodom source: https://www.softwarearchitekt.at/post/2016/12/02/sticky-routes-in-angular-2-3-with-routereusestrategy.aspx
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_universal_1 = require("angular2-universal");
var CustomReuseStrategy = /** @class */ (function () {
    function CustomReuseStrategy() {
        this.handlers = {};
    }
    CustomReuseStrategy.prototype.shouldDetach = function (route) {
        if (angular2_universal_1.isBrowser) {
            console.debug('CustomReuseStrategy:shouldDetach', route);
        }
        return true;
    };
    CustomReuseStrategy.prototype.store = function (route, handle) {
        if (angular2_universal_1.isBrowser) {
            console.debug('CustomReuseStrategy:store', route, handle);
        }
        this.handlers[route.routeConfig.path] = handle;
    };
    CustomReuseStrategy.prototype.shouldAttach = function (route) {
        if (angular2_universal_1.isBrowser) {
            console.debug('CustomReuseStrategy:shouldAttach', route);
        }
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.retrieve = function (route) {
        if (angular2_universal_1.isBrowser) {
            console.debug('CustomReuseStrategy:retrieve', route);
        }
        if (!route.routeConfig)
            return null;
        return this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        if (angular2_universal_1.isBrowser) {
            console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
        }
        return future.routeConfig === curr.routeConfig;
    };
    return CustomReuseStrategy;
}());
exports.CustomReuseStrategy = CustomReuseStrategy;
//# sourceMappingURL=customeReuseStrategy.js.map