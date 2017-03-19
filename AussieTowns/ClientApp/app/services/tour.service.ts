import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Cookie } from 'ng2-cookies';

import { RequestResult } from '../model/RequestResult';

@Injectable()
export class TourService {
    constructor(private http: Http) { }

    getAllOffers() {
        return this.http.get('/api/tour/offer', this.jwt()).map((response: Response) => response.json());
    }

    getOfferById(_id: number) {
        return this.http.get('/api/tour/offer/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    addOffer(tourOffer) {
        return this.http.post('api/tour/offer', tourOffer, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateOffer(tourOffer) {
        return this.http.put('api/tour/offer/' + tourOffer.Id, tourOffer, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteOffer(_id: number) {
        return this.http.delete('/api/tour/offer/' + _id, this.jwt());
    }

    getAllRequests() {
        return this.http.get('/api/tour/request', this.jwt()).map((response: Response) => response.json());
    }

    getRequestById(_id: number) {
        return this.http.get('/api/tour/request/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    addRequest(tourRequest) {
        return this.http.post('api/tour/request', tourRequest, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateRequest(tourRequest) {
        return this.http.put('api/tour/request/' + tourRequest.Id, tourRequest, this.jwt())
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteRequest(id: number) {
        return this.http.delete('/api/tour/request/' + id, this.jwt());
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