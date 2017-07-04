import http from './http-base';

export default class UserService {

    getAll() {
        return http.get('/users', this.jwt()).then(response => response.data);
    }

    getById(_id: string) {
        return http.get('api/user/' + _id).then(response => response.data);
    }

    signup(user) {
        return http.post('api/user/register', user).then(response => {
            let result = response.data;
            if (result.state == 1) {
                let json = result.data as any;

                return { token: json.accessToken, userId: json.userId };
            }
            return result;
        })
            .catch(this.handleError);
    }

    login(user) {
        return http.post('api/user/login', { email: user.email, password: user.password, source: user.source, externalid: user.externalId }).then(response => {
            let result = response.data;
            if (result.state == 1) {
                let json = result.data as any;

                return { token: json.accessToken, userId: json.userId };
            }
            return 0;
        })
        .catch(this.handleError);
    }

    getMiniProfile(id: number) {
        return http.get('api/user/summary/' + id, this.jwt())
            .then(response => {
                let result = response.data;
                if (result.state == 1) {
                    return result.data;
                }
                return '';
            })
            .catch(this.handleError);
    }

    getUserInfo(id: number) {
        return http.get('api/user/' + id, this.jwt())
            .then(response => response.data)
            .catch(this.handleError);
    }

    update(user: any) {
        return http.put('api/user/' + user.Id, user, this.jwt())
            .then(response => response.data)
            .catch(this.handleError);
    }

    getToursByUserId(id: number) {
        return http.get('api/user/tour/' + id, this.jwt())
            .then(response => response.data)
            .catch(this.handleError);
    }

    delete(_id: string) {
        return http.delete('/users/' + _id, this.jwt());
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