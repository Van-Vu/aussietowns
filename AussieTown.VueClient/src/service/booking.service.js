import http from './http-base';
var BookingService = /** @class */ (function () {
    function BookingService() {
        this.baseUrl = '/api/booking/';
    }
    BookingService.prototype.getBookingById = function (bookingId) {
        return http.get(this.baseUrl + bookingId)
            .then(function (response) { return response; });
    };
    BookingService.prototype.confirmBooking = function (bookingRequest) {
        return http.post(this.baseUrl, bookingRequest);
    };
    BookingService.prototype.modifyBooking = function (bookingId, bookingRequest) {
        return http.post("" + this.baseUrl + bookingId + "/update", bookingRequest);
    };
    BookingService.prototype.withdrawBooking = function (bookingId, tourGuestIds) {
        return http.post("" + this.baseUrl + bookingId + "/withdraw", tourGuestIds);
    };
    return BookingService;
}());
export default BookingService;
