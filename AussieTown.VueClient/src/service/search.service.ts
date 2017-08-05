import http from './http-base';

export default class SearchService {
    private locationAutocompleteUrl = 'api/search/autocomplete/?search=';  // URL to web API
    private userAutocompleteUrl = 'api/user/autocomplete/?search=';  // URL to web API

    getLocation(term: string) {
        return http.get(this.locationAutocompleteUrl + term)
            .then(response => response);
    }

    getUser(term: string) {
        return http.get(this.userAutocompleteUrl + term)
            .then(response => response);
    }
}