using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using Dapper;
using FunWithLocal.WebApi.Model;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
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
                        + "SELECT * FROM Tourguest WHERE bookingId=@bookingId;";

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
                        Participants = tourGuests?.ToList()
                    };
                }
            }
        }

        public async Task<int> ConfirmBooking(Booking booking, IList<TourGuest> tourGuests)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var bookingSql = "INSERT INTO booking(listingId, bookingDate, startTime, status, createdDate, updatedDate) "
                                         + "VALUES(@listingId, @bookingDate, @startTime, 0, NOW(), NOW())";
                        var bookingRet = await dbConnection.ExecuteAsync(bookingSql, new {listingId = booking.ListingId, bookingDate = booking.BookingDate, startTime = booking.StartTime });

                        var bookingId = Convert.ToInt16(await dbConnection.ExecuteScalarAsync("SELECT LAST_INSERT_ID()"));

                        var tourGuestSql = "INSERT INTO TourGuest(bookingId, existingUserId, isPrimary, firstName, lastName, email, phone, address, emergencyContact, createdDate, updatedDate) "
                                  + "VALUES(@bookingId, @existingUserId, @isPrimary, @firstName, @lastName, @email, @phone, @address, @emergencyContact, NOW(), NOW())";

                        foreach (var guest in tourGuests)
                        {
                            guest.BookingId = bookingId;
                        }

                        await dbConnection.ExecuteAsync(tourGuestSql, tourGuests);

                        tran.Commit();
                        return bookingId;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        _logger.LogCritical(e.Message, e);
                        throw;
                    }
                }
            }
        }

        public async Task<int> UpdateBooking(int bookingId, IList<TourGuest> guests)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var updateTasks = new List<Task<int>>();

                        var bookingSql = "UPDATE Booking SET updatedDate=NOW() WHERE id=@bookingId;";
                        updateTasks.Add(dbConnection.ExecuteAsync(bookingSql, new {bookingId}));

                        var oldGuests = guests.Where(x => x.Id > 0);
                        var updateSql =
                            "UPDATE Tourguest SET IsPrimary=@IsPrimary, FirstName=@firstName, LastName=@lastName, Email=@Email, Phone=@phone, Address=@address, EmergencyContact=@emergencyContact, updatedDate=NOW() WHERE Id=@id;";
                        updateTasks.Add(dbConnection.ExecuteAsync(updateSql, oldGuests));

                        var newGuests = guests.Where(p => oldGuests.All(p2 => p2.Id != p.Id));
                        if (newGuests.Any())
                        {
                            var insertSql = "INSERT INTO TourGuest(bookingId, existingUserId, isPrimary, firstName, lastName, email, phone, address, emergencyContact) "
                                      + "VALUES(@bookingId, @existingUserId, @isPrimary, @firstName, @lastName, @email, @phone, @address, @emergencyContact);";
                            updateTasks.Add(dbConnection.ExecuteAsync(insertSql, newGuests));
                        }

                        await Task.WhenAll(updateTasks);

                        //Bodom
                        tran.Commit();
                        return 1;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        _logger.LogCritical(e.Message, e);
                        throw;
                    }
                }
            }
        }

        public async Task<int> WithdrawBooking(int bookingId)
        {
            // Booking Status:
            // 0: pending
            // 1: confirm
            // 2: withdraw

            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE booking SET status=2 WHERE id=@bookingId";
                dbConnection.Open();
                return await dbConnection.ExecuteAsync(sql, new { bookingId });
            }
        }

        public async Task<IEnumerable<BookingSlot>> GetBookingSlotsByListingId(int listingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM Booking WHERE listingid=@listingId;";
                dbConnection.Open();
                return await dbConnection.QueryAsync<BookingSlot>(sql,new {listingId});
            }
        }

        public async Task<IEnumerable<BookingResponse>> GetAllBookingsByDate(int listingId, DateTime bookingDate, TimeSpan startTime)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var bookingDictionary = new Dictionary<int, BookingResponse>();

                var sql = "SELECT * FROM Booking b INNER JOIN Tourguest t ON t.bookingId = b.id "
                    + "WHERE b.listingid=@listingId AND b.bookingDate=@bookingDate AND b.starttime=@starttime;";
                dbConnection.Open();
                return (await dbConnection.QueryAsync<BookingResponse, TourGuest, BookingResponse>(sql,
                    (booking, tourGuests) =>
                    {
                        BookingResponse bookingResponse;

                        if (!bookingDictionary.TryGetValue(booking.Id, out bookingResponse))
                        {
                            bookingResponse = booking;
                            bookingResponse.Participants = new List<TourGuest>();
                            bookingDictionary.Add(bookingResponse.Id, bookingResponse);
                        }

                        bookingResponse.Participants.Add(tourGuests);
                        return bookingResponse;
                    },
                    new {listingId, bookingDate, startTime}))
                    .Distinct()
                    .ToList();
            }
        }
    }
}
