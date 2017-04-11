import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../model/user';
import { RequestResult } from '../model/RequestResult';
import { Observable } from 'rxjs/Observable';
import { CookieFactory } from '../components/mock/cookieFactory';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    getAll() {
        return this.http.get('/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('api/user/register', user, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let json = result.data as any;

                CookieFactory.set("token", json.accessToken);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result;
        })
        .catch(this.handleError);
    }

    login(user) {
        return this.http.post('api/user/login', { email: user.email, password: user.password }).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let json = result.data as any;

                CookieFactory.set("token", json.accessToken);
                CookieFactory.set("userId", json.userId);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result.data;
        })
        .catch(this.handleError);
    }

    getMiniProfile(id: number) {
        return this.http.get('api/user/summary/' + id, this.jwt())
            .map(response => {
                let result = response.json() as RequestResult;
                if (result.state == 1) {
                    return result.data;
                }
                return '';
            })
            .catch(this.handleError);
    }

    getUserInfo(id: number) {
        return this.http.get('api/user/' + id, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    update(user: any) {
        return this.http.put('api/user/' + user.Id, user, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    getToursByUserId(id: number) {
        return this.http.get('api/user/tour/' + id, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id, this.jwt());
    }

    search(term: string): Observable<User[]> {
        return this.http.get('api/user/autocomplete/?search=' + term)
            .map(response => response.json())
            .catch(this.handleError);
    }

    // private helper methods

    upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);

        return this.http
            .post("/api/user/profileimage", input);
    }

    private jwt() {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let token = CookieFactory.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + CookieFactory.get("token"));
        }

        return new RequestOptions({ headers: headers });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}