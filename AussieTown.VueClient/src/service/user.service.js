import http from './http-base';
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getAll = function () {
        return http.get('/users').then(function (response) { return response; });
    };
    UserService.prototype.getById = function (_id) {
        return http.get('api/user/' + _id).then(function (response) { return response; });
    };
    UserService.prototype.signup = function (user) {
        return http.post('api/user/register', user).then(function (response) {
            var result = response;
            return result;
        })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (user) {
        return http.post('api/user/login', { email: user.email, password: user.password, source: user.source, externalid: user.externalId })
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    UserService.prototype.getMiniProfile = function (id) {
        return http.get('api/user/summary/' + id)
            .then(function (response) {
            var result = response;
            return result;
        });
    };
    UserService.prototype.getUserInfo = function (id) {
        return http.get('api/user/' + id)
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        return http.put('api/user/' + user.id, user)
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.getToursByUserId = function (id) {
        return http.get('api/user/tour/' + id)
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (_id) {
        return http.delete('/users/' + _id);
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        //let token = this.$cookie.get("mtl:tk");
        //if (token) {
        //    headers.append('Authorization', 'Bearer ' + token);
        //}
        //return new RequestOptions({ headers: headers });
        return '';
    };
    UserService.prototype.handleError = function (error) {
        return Promise.reject(error.data || error);
    };
    return UserService;
}());
export default UserService;
