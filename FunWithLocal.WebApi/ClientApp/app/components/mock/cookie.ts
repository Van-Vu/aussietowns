export class CookieMock {
    public static check(name: string): boolean { return false; }
    public static get(name: string): string { return ''; }
    public static getAll(): any {}
    public static set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {}
    public static delete(name: string, path?: string, domain?: string) {}
    public static deleteAll(path?: string, domain?: string): any {}
}