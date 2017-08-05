import http from './http-base';

export default class LogService {
    private baseUrl = '/api/log';

    logError(message, stack) {
        //return http.post(this.baseUrl + '/error', {message: message})
        //    .then(response => response);
        return http.post(this.baseUrl + '/error', `message="${message}. Full stack: ${stack}"`)
            .then(response => response);
    }
}