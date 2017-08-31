import http from './http-base';
var LogService = /** @class */ (function () {
    function LogService() {
        this.baseUrl = '/api/log';
    }
    LogService.prototype.logError = function (message, stack) {
        //return http.post(this.baseUrl + '/error', {message: message})
        //    .then(response => response);
        return http.post(this.baseUrl + '/error', "message=\"" + message + ". Full stack: " + stack + "\"")
            .then(function (response) { return response; });
    };
    return LogService;
}());
export default LogService;
