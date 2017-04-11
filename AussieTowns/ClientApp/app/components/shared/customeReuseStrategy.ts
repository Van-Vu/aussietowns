// Bodom source: https://www.softwarearchitekt.at/post/2016/12/02/sticky-routes-in-angular-2-3-with-routereusestrategy.aspx

import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { isBrowser } from 'angular2-universal';

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (isBrowser) {
            console.debug('CustomReuseStrategy:shouldDetach', route);    
        }
        
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (isBrowser) {
            console.debug('CustomReuseStrategy:store', route, handle);
        }
        this.handlers[route.routeConfig.path] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (isBrowser) {
            console.debug('CustomReuseStrategy:shouldAttach', route);
        }

        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (isBrowser) {
            console.debug('CustomReuseStrategy:retrieve', route);
        }

        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (isBrowser) {
            console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
        }
        return future.routeConfig === curr.routeConfig;
    }

}