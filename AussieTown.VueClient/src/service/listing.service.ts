import http from './http-base';
import ListingModel from '../model/listing.model';

export default class ListingService {
    private baseUrl = '/api/listing/';
    private getListingByUserUrl = this.baseUrl + '?user=';
    private getListingBySuburbUrl = this.baseUrl + 'suburb/';

    getListingById(_id: number) {
        return http.get(this.baseUrl + _id)
            .then(response => response.data);
    }

    addListing(listing) {
        return http.post(this.baseUrl, listing)
            .then(response => {
            let result = response.data;
            if (result.state === 1) {
                return result;
            }
        })
            .catch(this.handleError);
    }

    updateListing(listing) {
        return http.put(this.baseUrl + listing.id, listing)
            .then(response => response.data)
            .catch(this.handleError);
    }

    deleteListing(_id: number) {
        return http.delete(this.baseUrl + _id);
    }

    getListingsByUserId(userId: number){
        return http.get(this.getListingByUserUrl + userId)
            .then(response => {
                return response.data;
            });
    }

    getListingBySuburb(suburbId: number) {
        return http.get(this.getListingBySuburbUrl + suburbId)
            .then(response => {
                return response.data;
            });
    }

    deleteImage(listingId: number, url: string) {
        return http.post(`${this.baseUrl}${listingId}/deleteImage`,`url=${url}`);
    }

    bookAListing(bookingRequest) {
        return http.post(`${this.baseUrl}${bookingRequest.listingId}/book`, bookingRequest);
    }

    private jwt() {
        // create authorization header with jwt token
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');


        //let token = Cookie.check("token");
        //if (token) {
        //    headers.append('Authorization', 'Bearer ' + Cookie.get("token"));
        //}

        //return new RequestOptions({ headers: headers });
	return '';
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}