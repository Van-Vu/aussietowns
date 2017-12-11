using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface IBookingService
    {
        Task<BookingResponse> GetBooking(int bookingId);

        Task<IEnumerable<BookingResponse>> GetAllBookingsByDate(int listingId, DateTime bookingDate, TimeSpan startTime);
        Task<IEnumerable<BookingSlot>> GetBookingSlotsByListingId(int listingId);
        Task<int> ConfirmBooking(BookingRequest bookingRequest);
        Task<int> UpdateBooking(int bookingId, BookingRequest bookingRequest);
        Task<int> WithdrawBooking(int bookingId);
    }
}
