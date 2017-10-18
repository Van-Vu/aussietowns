import http from './http-base';

export default class BookingService {
    private baseUrl = '/api/booking/';

    getBookingById(_id: number) {
        return http.get(this.baseUrl + _id)
            .then(response => response);
    }
}