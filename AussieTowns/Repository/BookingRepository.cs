using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using Dapper;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Repository
{
    public class BookingRepository: RepositoryBase, IBookingRepository
    {
        private readonly ILogger<BookingRepository> _logger;

        public BookingRepository(string connString, ILogger<BookingRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<BookingResponse> GetBooking(int bookingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM Booking b WHERE b.id=@bookingId;"
                        + "SELECT * FROM Tourguest WHERE id IN (SELECT tourguestId FROM Booking WHERE id=@bookingId);";

                dbConnection.Open();
                using (var multipleResults = await dbConnection.QueryMultipleAsync(sql, new {bookingId}))
                {
                    var booking = multipleResults.Read<Booking>().FirstOrDefault();
                    if (booking == null)
                    {
                        _logger.LogInformation("Can't find booking with id: {booking}", bookingId);
                        throw new ArgumentOutOfRangeException(nameof(bookingId), "Invalid Booking");
                    }

                    var tourGuests = multipleResults.Read<TourGuest>();

                    return new BookingResponse
                    {
                        Id= booking.Id,
                        BookingDate = booking.BookingDate,
                        StartTime = booking.StartTime,
                        ListingId = booking.ListingId,
                        TourGuests = tourGuests?.ToList()
                    };
                }
            }
        }
    }
}
