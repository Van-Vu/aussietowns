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
    }
}
