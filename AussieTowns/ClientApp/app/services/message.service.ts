import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, URLSearchParams, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { RequestResult } from '../model/RequestResult';
import { CookieFactory } from '../components/mock/cookieFactory';

@Injectable()
export class MessageService {
    private baseUrl = '/api/message/';
    model: FormGroup;

    constructor(private http: Http, private fb: FormBuilder) {}

    send(message: any) {
        return this.http.post(this.baseUrl, message, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let json = result.data as any;
            }
            return result;
        })
        .catch(this.handleError);    
    }

    deleteMessage(messageId) {
        return this.http.delete(this.baseUrl + messageId);
    }

    deleteConversation(senderId, recipientId) {
        return this.http.delete(this.baseUrl + 'conversation/' + senderId + '/' + recipientId);
    }

    getConversationsByUser(userId): Observable<any> {
        return this.http.get(this.baseUrl + 'user/' + userId, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let data = result.data as any;
                return data;
            }
            
        })
            .catch(this.handleError);
    }

    getConversation(senderId, recipientId): Observable<any> {
        return this.http.get(this.baseUrl + 'conversation/' + senderId + '/' + recipientId, this.jwt()).map(response => {
            let result = response.json() as RequestResult;
            if (result.state == 1) {
                let data = result.data as any;
                return data;
            }
        })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        //let errMsg: string;
        //if (error instanceof Response) {
        //    const body = error.json() || '';
        //    const err = body.error || JSON.stringify(body);
        //    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        //} else {
        //    errMsg = error.message ? error.message : error.toString();
        //}
        //console.error(errMsg);
        //alert('there error');
        return Observable.throw('something wrong !');
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

}