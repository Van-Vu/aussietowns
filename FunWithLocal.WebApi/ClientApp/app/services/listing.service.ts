import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';

import { RequestResult } from '../model/RequestResult';


@Injectable()
export class ListingService {
    private baseUrl = '/api/listing/';
    private getListingByUserUrl = this.baseUrl + '?user=';
    private getListingBySuburbUrl = this.baseUrl + 'suburb/';

    constructor(private http: Http) { }

    getListingById(_id: number): Observable<any> {
        return this.http.get(this.baseUrl + _id).map((response: Response) => {
            let result = response.json() as RequestResult;
            return result.data;
        });
    }

    addListing(listing) {
        return this.http.post(this.baseUrl, listing, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let json = result.data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateListing(listing) {
        return this.http.put(this.baseUrl + listing.id, listing)
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteListing(_id: number) {
        return this.http.delete(this.baseUrl + _id);
    }

    getListingsByUserId(userId: number): Observable<any> {
        return this.http.get(this.getListingByUserUrl + userId,this.jwt()).map((response: Response) => response.json().data);
    }

    getListingBySuburb(suburbId: number): Observable<any> {
        return this.http.get(this.getListingBySuburbUrl + suburbId).map((response: Response) => response.json().data);
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