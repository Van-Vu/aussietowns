import http from './http-base';
var SearchService = (function () {
    function SearchService() {
        this.locationAutocompleteUrl = 'api/search/autocomplete/?search='; // URL to web API
        this.userAutocompleteUrl = 'api/user/autocomplete/?search='; // URL to web API
    }
    SearchService.prototype.getLocation = function (term) {
        return http.get(this.locationAutocompleteUrl + term)
            .then(function (response) { return response; });
    };
    SearchService.prototype.getUser = function (term) {
        return http.get(this.userAutocompleteUrl + term)
            .then(function (response) { return response; });
    };
    return SearchService;
}());
export default SearchService;
