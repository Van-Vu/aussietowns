using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IBookingRepository
    {
        Task<BookingResponse> GetBooking(int bookingId);
        Task<int> ConfirmBooking(Booking booking, IList<TourGuest> tourGuests);
        Task<int> UpdateBooking(int bookingId, IList<TourGuest> guests);
        Task<int> WithdrawBooking(int bookingId, string[] tourGuestIds);
    }
}
