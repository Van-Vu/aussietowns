import http from './http-base';

export default class UserService {

    getAll() {
        return http.get('/users').then(response => response);
    }

    getById(_id: string) {
        return http.get('api/user/' + _id).then(response => response);
    }

    signup(user) {
        return http.post('api/user/register', user).then(response => {
            let result = response;
            return result;
        });
    }

    login(user) {
        return http.post('api/user/login', { email: user.email, password: user.password, source: user.source, externalid: user.externalId })
            .then(response => response);
    }

    getMiniProfile(id: number) {
        return http.get('api/user/summary/' + id)
            .then(response => {
                let result = response;
                return result;
            });
    }

    getUserInfo(id: number) {
        return http.get('api/user/' + id)
            .then(response => response.data);
    }

    update(user: any) {
        return http.put('api/user/' + user.id, user)
            .then(response => response);
    }

    getToursByUserId(id: number) {
        return http.get('api/user/tour/' + id)
            .then(response => response.data);
    }

    delete(_id: string) {
        return http.delete('/users/' + _id);
    }

    private jwt() {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');


        //let token = this.$cookie.get("mtl:tk");
        //if (token) {
        //    headers.append('Authorization', 'Bearer ' + token);
        //}

        //return new RequestOptions({ headers: headers });
        return '';
    }
}