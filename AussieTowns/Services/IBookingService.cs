using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IBookingService
    {
        Task<BookingResponse> GetBooking(int bookingId);
    }
}
