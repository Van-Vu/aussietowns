import http from './http-base';
import ListingModel from '../model/listing.model';

export default class ListingService {
    private baseUrl = '/api/listing/';
    private getListingByUserUrl = this.baseUrl + '?user=';
    private getListingBySuburbUrl = this.baseUrl + 'suburb/';
    private getFeatureListingsUrl = this.baseUrl + 'feature';

    getListingById(_id: number) {
        return http.get(this.baseUrl + _id)
            .then(response => response);
    }

    getListingWithBookingDetailById(id: number) {
        return http.get(this.baseUrl + id + "/booking")
            .then(response => response);
    }

    addListing(listing) {
        return http.post(this.baseUrl, listing)
            .then(response => response)
            .catch(this.handleError);
    }

    updateListing(listing) {
        return http.put(this.baseUrl + listing.id, listing)
            .then(response => response)
            .catch(this.handleError);
    }

    deleteListing(_id: number) {
        return http.delete(this.baseUrl + _id);
    }

    getListingsByUserId(userId: number){
        return http.get(this.getListingByUserUrl + userId)
            .then(response => response);
    }

    getListingBySuburb(suburbId: number) {
        return http.get(this.getListingBySuburbUrl + suburbId)
            .then(response => response);
    }

    getFeatureListings() {
        return http.get(this.getFeatureListingsUrl)
            .then(response => response);        
    }

    deleteImage(listingId: number, url: string) {
        return http.post(`${this.baseUrl}${listingId}/deleteImage`,`url=${url}`);
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
        console.error('Bodom An error occurred', error);
        return Promise.reject(error.message || error);
    }
}