import http from './http-base';

export default class SettingsService {
    private baseUrl = '/api/settings/';

    getAllHobbies() {
        return http.get(`${this.baseUrl}hobbies`)
            .then(response => response);
    }
}