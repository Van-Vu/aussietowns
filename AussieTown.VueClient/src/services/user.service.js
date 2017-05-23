import { http } from './http-base';
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getAll = function () {
        return http.get('/users', this.jwt()).then(function (response) { return response.data; });
    };
    UserService.prototype.getById = function (_id) {
        return http.get('/users/' + _id, this.jwt()).then(function (response) { return response.data; });
    };
    UserService.prototype.create = function (user) {
        return http.post('api/user/register', user, this.jwt()).then(function (response) {
            var result = response.data;
            if (result.state == 1) {
                var json = result.data;
                localStorage.setItem("token", json.accessToken);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result;
        })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (user) {
        return http.post('api/user/login', { email: user.email, password: user.password }).then(function (response) {
            var result = response.data;
            if (result.state == 1) {
                var json = result.data;
                localStorage.setItem("token", json.accessToken);
                localStorage.setItem("userId", json.userId);
                return json.userId;
            }
            return 0;
        })
            .catch(this.handleError);
    };
    UserService.prototype.getMiniProfile = function (id) {
        return http.get('api/user/summary/' + id, this.jwt())
            .then(function (response) {
            var result = response.data;
            if (result.state == 1) {
                return result.data;
            }
            return '';
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUserInfo = function (id) {
        return http.get('api/user/' + id, this.jwt())
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        return http.put('api/user/' + user.Id, user, this.jwt())
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.getToursByUserId = function (id) {
        return http.get('api/user/tour/' + id, this.jwt())
            .then(function (response) { return response.data; })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (_id) {
        return http.delete('/users/' + _id, this.jwt());
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        //let token = Cookie.check("token");
        //if (token) {
        //    headers.append('Authorization', 'Bearer ' + Cookie.get("token"));
        //}
        //return new RequestOptions({ headers: headers });
        return '';
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
export { UserService };
