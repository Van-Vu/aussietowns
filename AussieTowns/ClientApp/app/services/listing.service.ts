import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';

import { RequestResult } from '../model/RequestResult';

@Injectable()
export class ListingService {
    baseUrl = '/api/listing/';
    getListingByUserUrl = this.baseUrl + '?user=';

    constructor(private http: Http) { }

    getListingById(_id: number): Observable<any> {
        return this.http.get(this.baseUrl + _id).map((response: Response) => response.json().Data);
    }

    addListing(tourOffer) {
        return this.http.post(this.baseUrl, tourOffer).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateListing(tourOffer) {
        return this.http.put(this.baseUrl + tourOffer.Id, tourOffer)
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteListing(_id: number) {
        return this.http.delete(this.baseUrl + _id);
    }

    getListingsByUserId(userId: number): Observable<any> {
        return this.http.get(this.getListingByUserUrl + userId,this.jwt()).map((response: Response) => response.json().Data);
    }

    private jwt() {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');


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