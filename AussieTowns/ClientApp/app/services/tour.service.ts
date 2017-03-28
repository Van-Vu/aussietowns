import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cookie } from 'ng2-cookies';

import { RequestResult } from '../model/RequestResult';

@Injectable()
export class TourService {
    constructor(private http: Http) { }

    getAllOffers() {
        return this.http.get('/api/tour/offer').map((response: Response) => response.json());
    }

    getAllListingOffer(): Observable<any> {
        return this.http.get('/api/tour/offer/listing').map((response: Response) => response.json().Data);
    }

    getOfferById(_id: number) {
        return this.http.get('/api/tour/offer/' + _id).map((response: Response) => response.json());
    }

    getListingOfferById(_id: number): Observable<any> {
        return this.http.get('/api/tour/offer/listing/' + _id).map((response: Response) => response.json().Data);
    }

    addOffer(tourOffer) {
        return this.http.post('api/tour/offer', tourOffer).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateOffer(tourOffer) {
        return this.http.put('api/tour/offer/' + tourOffer.Id, tourOffer)
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteOffer(_id: number) {
        return this.http.delete('/api/tour/offer/' + _id);
    }

    getAllRequests() {
        return this.http.get('/api/tour/request').map((response: Response) => response.json());
    }

    getRequestById(_id: number) {
        return this.http.get('/api/tour/request/' + _id).map((response: Response) => response.json());
    }

    getListingRequestById(_id: number) {
        return this.http.get('/api/tour/request/listing/' + _id).map((response: Response) => response.json());
    }

    addRequest(tourRequest) {
        return this.http.post('api/tour/request', tourRequest).map(response => {
            let result = response.json() as RequestResult;
            if (result.State == 1) {
                let json = result.Data as any;
            }
            return result;
        })
            .catch(this.handleError);
    }

    updateRequest(tourRequest) {
        return this.http.put('api/tour/request/' + tourRequest.Id, tourRequest)
            .map(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    deleteRequest(id: number) {
        return this.http.delete('/api/tour/request/' + id);
    }



    //private jwt() {
    //    // create authorization header with jwt token
    //    var headers = new Headers();
    //    headers.append('Content-Type', 'application/json; charset=utf-8');


    //    let token = Cookie.check("token");
    //    if (token) {
    //        headers.append('Authorization', 'Bearer ' + Cookie.get("token"));
    //    }

    //    return new RequestOptions({ headers: headers });
    //}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}