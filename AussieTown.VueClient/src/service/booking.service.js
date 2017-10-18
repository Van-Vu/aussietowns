import http from './http-base';
var BookingService = /** @class */ (function () {
    function BookingService() {
        this.baseUrl = '/api/booking/';
    }
    BookingService.prototype.getBookingById = function (_id) {
        return http.get(this.baseUrl + _id)
            .then(function (response) { return response; });
    };
    return BookingService;
}());
export default BookingService;
