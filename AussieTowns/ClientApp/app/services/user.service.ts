﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Cookie } from 'ng2-cookies';

import { User } from '../model/user';
import { RequestResult } from '../model/RequestResult';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('api/user/register', user, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;

                Cookie.set("token", json.accessToken);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result;
        })
        .catch(this.handleError);
    }

    login(user) {
        return this.http.post('api/user/login', { email: user.Email, password: user.Password }, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;

                Cookie.set("token", json.accessToken);
                //sessionStorage.setItem("token", json.accessToken);
            }
            return result;
        })
            .catch(this.handleError);
    }

    getUserInfo() {
        return this.http.get('api/user/info', this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    update(user: any) {
        return this.http.put('api/user/' + user.Id, user, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id, this.jwt());
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
        

        let token = Cookie.check("token");
        if (token) {
            headers.append('Authorization', 'Bearer ' + Cookie.get("token"));
        }

        return new RequestOptions({ headers: headers });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}