import http from './http-base';

export default class BookingService {
    private baseUrl = '/api/booking/';

    getBookingById(bookingId: number) {
        return http.get(this.baseUrl + bookingId)
            .then(response => response);
    }

    confirmBooking(bookingRequest) {
        return http.post(this.baseUrl, bookingRequest);
    }

    modifyBooking(bookingId, bookingRequest) {
        return http.post(`${this.baseUrl}${bookingId}/update`, bookingRequest);
    }

    withdrawBooking(bookingId, tourGuestIds) {
        return http.post(`${this.baseUrl}${bookingId}/withdraw`, tourGuestIds);
    }
}