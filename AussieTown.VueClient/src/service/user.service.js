import http from './http-base';
var UserService = /** @class */ (function () {
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
        });
    };
    UserService.prototype.login = function (user) {
        return http.post('api/user/login', { email: user.email, password: user.password, source: user.source, externalid: user.externalId })
            .then(function (response) { return response; });
    };
    UserService.prototype.verifyToken = function (token) {
        console.log('Bodom verify Token:' + token);
        return http.get('api/user/verifyToken/' + token).then(function (response) {
            return response;
        });
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
            .then(function (response) { return response.data; });
    };
    UserService.prototype.confirm = function (user) {
        return http.post('api/user/confirm', { token: user.token, firstName: user.firstName, lastName: user.lastName })
            .then(function (response) { return response; });
    };
    UserService.prototype.update = function (user) {
        return http.post('api/user/' + user.id, user)
            .then(function (response) { return response; });
    };
    UserService.prototype.getToursByUserId = function (id) {
        return http.get('api/user/tour/' + id)
            .then(function (response) { return response.data; });
    };
    UserService.prototype.verifyEmail = function (email) {
        return http.get('api/user/verifyEmail/' + email)
            .then(function (response) { return response; });
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
    return UserService;
}());
export default UserService;
