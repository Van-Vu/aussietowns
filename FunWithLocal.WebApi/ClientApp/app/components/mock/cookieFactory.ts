import { isBrowser } from 'angular2-universal';
import { Cookie } from 'ng2-cookies';
import { CookieMock } from './cookie';

export class CookieFactory {

    constructor() { }

    private static getCookies() {
        if (isBrowser) {
            return Cookie;
        }
        else {
            return CookieMock;
        }
    }

    public static check(name: string): boolean {
        return this.getCookies().check(name);
    }

    public static get(name: string): string { return this.getCookies().get(name); }

    public static set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
        return this.getCookies().set(name,value,expires,path,domain,secure);
    }

    public static delete(name: string, path?: string, domain?: string) {
        return this.getCookies().delete(name,path,domain);
    }

    public static deleteAll(path?: string, domain?: string): any {
        return this.getCookies().delete(path,domain);
    }
}