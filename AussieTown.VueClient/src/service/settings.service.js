import http from './http-base';
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.baseUrl = '/api/settings/';
    }
    SettingsService.prototype.getAllHobbies = function () {
        return http.get(this.baseUrl + "hobbies")
            .then(function (response) { return response; });
    };
    return SettingsService;
}());
export default SettingsService;
