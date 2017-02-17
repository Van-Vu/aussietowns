import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SuburbLocation } from '../model/suburbLocation';
//import { SuburbDetails } from '../model/suburbDetails';

@Injectable()
export class SearchService {
    private searchUrl = '/api/search';  // URL to web API
    private detailUrl = '/api/search/detail/';  // URL to web API
    constructor(private http: Http) { }

    getSuburbs(): Observable<SuburbLocation[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let data = new URLSearchParams();
        data.append('topleftlat', '1');
        data.append('topleftlong', '1');
        data.append('bottomrightlat', '1');
        data.append('bottomrightlong', '1');
        let body = data.toString();

        return this.http.post(this.searchUrl, body, { headers: headers })
            .map(response => response.json())
            .catch(this.handleError);
    }

    // Bodom
    //getSuburbDetails(postCode): Observable<SuburbDetails> {
    //    return this.http.get(this.detailUrl + postCode)
    //        .map(response => response.json())
    //        .catch(this.handleError);
    //}

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        alert('there error');
        return Observable.throw(errMsg);
    }
}