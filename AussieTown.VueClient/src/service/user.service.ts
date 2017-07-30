import http from './http-base';

export default class UserService {

    getAll() {
        return http.get('/users').then(response => response.data);
    }

    getById(_id: string) {
        return http.get('api/user/' + _id).then(response => response.data);
    }

    signup(user) {
        return http.post('api/user/register', user).then(response => {
            let result = response.data;
            if (result.state == 1) {
                return result.data;
            }
            return result;
        })
            .catch(this.handleError);
    }

    login(user) {
        return http.post('api/user/login', { email: user.email, password: user.password, source: user.source, externalid: user.externalId })
            .then(response => response.data)
        .catch(this.handleError);
    }

    getMiniProfile(id: number) {
        return http.get('api/user/summary/' + id)
            .then(response => {
                let result = response.data;
                if (result.state == 1) {
                    return result.data;
                }
                return '';
            });
    }

    getUserInfo(id: number) {
        return http.get('api/user/' + id)
            .then(response => response.data)
            .catch(this.handleError);
    }

    update(user: any) {
        return http.put('api/user/' + user.id, user)
            .then(response => response.data)
            .catch(this.handleError);
    }

    getToursByUserId(id: number) {
        return http.get('api/user/tour/' + id)
            .then(response => response.data)
            .catch(this.handleError);
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}