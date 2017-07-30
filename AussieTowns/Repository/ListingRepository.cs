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
    public class ListingRepository: RepositoryBase, IListingRepository
    {
        private readonly ILogger<ListingRepository> _logger;

        public ListingRepository(string connString, ILogger<ListingRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<Listing> GetListingById(int listingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM listing WHERE id = @listingid; "
                          + "SELECT sd.* FROM SuburbDetail sd INNER JOIN Listing l ON sd.id = l.locationId WHERE l.id = @listingid;"
                          + "SELECT * FROM Image i WHERE ListingId = @listingId AND IsActive = true ORDER BY sortorder, createddate;"
                          + "SELECT * FROM TourOperator o INNER JOIN User u ON o.userid = u.id WHERE ListingId = @listingid;"
                          + "SELECT * FROM TourGuest g LEFT OUTER JOIN User u ON u.id = g.existingUserId WHERE ListingId = @listingId";

                dbConnection.Open();
                Listing listing;
                using (var multipleResults = await dbConnection.QueryMultipleAsync(sql, new {listingId}))
                {
                    listing = multipleResults.Read<Listing>().FirstOrDefault();

                    if (listing == null)
                    {
                        _logger.LogInformation("Can't find listing with id: {listingId}", listingId);
                        throw new ArgumentOutOfRangeException(nameof(listingId), "Invalid Listing");
                    }

                    var location = multipleResults.Read<SuburbDetail>().FirstOrDefault();
                    var images = multipleResults.Read<Image>()?.ToList();
                    var operators = multipleResults.Read<TourOperator,User, TourOperator>((tourOperator, user) =>
                    {
                        if (user != null)
                        {
                            tourOperator.User = user;
                        }

                        return tourOperator;
                    })?.ToList();
                    var guests = multipleResults.Read<TourGuest,User,TourGuest>((tourguest, user) =>
                    {
                        if (user != null) tourguest.User = user;

                        return tourguest;
                    })?.ToList();

                    listing.ImageList = listing.ImageList ?? new List<Image>();
                    listing.ImageList.AddRange(images);

                    listing.TourOperators = listing.TourOperators ?? new List<TourOperator>();
                    listing.TourOperators.AddRange(operators);

                    listing.TourGuests = listing.TourGuests?? new List<TourGuest>();
                    listing.TourGuests.AddRange(guests);

                    listing.Location = location;
                }

                //https://stackoverflow.com/questions/34929231/map-a-column-with-string-representing-a-list-to-a-list-object-using-dapper
                var scheduleSql = "SELECT s.id, s.startDate, s.duration, s.enddate, s.repeatedtype, s.repeatedday, s.listingid FROM Schedule s INNER JOIN Listing l ON s.listingid = l.id WHERE ListingId = @listingid;";
                
                var schedules = await dbConnection.QueryAsync<int, DateTime, TimeSpan, DateTime, RepeatedType?, string, int, Schedule>(scheduleSql,
                    (id, startDate, duration, endDate, repeatedType, repeatedDay, listingid) => new Schedule
                    {
                        Id= id,
                        StartDate = startDate,
                        Duration = duration,
                        EndDate = endDate,
                        RepeatedType = repeatedType,
                        RepeatedDay = repeatedDay?.ToString().Split(',').ToList(),
                        ListingId = listingid
                    }, new {listingId}, splitOn: "*");

                listing.Schedules = schedules.ToList();
                return listing;
            }
        }

        public async Task<IEnumerable<Listing>> GetListingByUserId(int userId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "select * from listingview where area = (select distinct area from listingview where suburbid = 139)";
                dbConnection.Open();
                return await dbConnection.QueryAsync<Listing>(sql);
            }
        }

        public async Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "select * from listingview where area = (select distinct area from listingview where suburbid = @suburbId)";
                dbConnection.Open();
                var listingviews =  await dbConnection.QueryAsync<ListingView>(sql,new {suburbId});

                return listingviews;
            }
        }

        public async Task<int> InsertListing(Listing listing)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var sql = "INSERT INTO Listing(type,locationid,cost,currency, header, description, requirement, minparticipant,createdDate,updatedDate,isactive) "
                                + "VALUES(@type, @locationid, @cost, @currency, @header, @description, @requirement, @minparticipant,@createdDate,@updatedDate,@isactive);"
                                + "SELECT LAST_INSERT_ID()";
                        listing.CreatedDate = DateTime.Now;
                        listing.UpdatedDate = DateTime.Now;
                        listing.IsActive = true;
                        await dbConnection.ExecuteAsync(sql, listing);

                        var listingId = Convert.ToInt16(await dbConnection.ExecuteScalarAsync("SELECT LAST_INSERT_ID()"));

                        var insertTasks = new List<Task<int>>();

                        if (listing.Schedules != null && listing.Schedules.Any())
                        {
                            foreach (var schedule in listing.Schedules)
                            {
                                schedule.ListingId = listingId;
                            }
                            var scheduleSql =
                                "INSERT INTO Schedule(startdate, duration, enddate, repeatedtype, repeatedDay, listingid) "
                                + " VALUES(@startDate, @duration, @endDate, @repeatedType, @repeatedDay, @listingId)";
                            insertTasks.Add(dbConnection.ExecuteAsync(scheduleSql, listing.Schedules));
                        }

                        if (listing.TourOperators != null && listing.TourOperators.Any())
                        {
                            foreach (var tourOperator in listing.TourOperators)
                            {
                                tourOperator.ListingId = listingId;
                            }
                            var operatorSql = "INSERT INTO TourOperator(userid, listingid, isowner) "
                                + " VALUES(@userId, @listingId, @isOwner)";
                            insertTasks.Add(dbConnection.ExecuteAsync(operatorSql, listing.TourOperators));
                        }

                        if (listing.TourGuests != null && listing.TourGuests.Any())
                        {
                            foreach (var tourGuest in listing.TourGuests)
                            {
                                tourGuest.ListingId = listingId;
                            }
                            var guestSql = "INSERT INTO TourGuest(userid, listingid, isowner) "
                                + "VALUES(@userId, @listingId, @isOwner)";

                            insertTasks.Add(dbConnection.ExecuteAsync(guestSql, listing.TourGuests));
                        }

                        await Task.WhenAll(insertTasks);

                        tran.Commit();
                        return listingId;
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

        public async Task<int> UpdateListing(Listing listing)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var updateTasks = new List<Task<int>>();

                        var sql = "UPDATE Listing SET LocationId = @locationId, Cost = @cost, Currency = @currency, Header = @header, Description = @description, "
                                  + "Requirement = @requirement, MinParticipant = @minParticipant, updatedDate=@updatedDate, isActive=@isActive WHERE Id = @id";
                        listing.UpdatedDate = DateTime.Now;
                        listing.IsActive = true;
                        updateTasks.Add(dbConnection.ExecuteAsync(sql, listing));

                        var scheduleUpdate =
                            "UPDATE Schedule SET Startdate = @startDate, Duration = @duration, Enddate = @endDate, RepeatedType = @repeatedType, RepeatedDay = @repeatedDayText WHERE Id=@id";
                        updateTasks.Add(dbConnection.ExecuteAsync(scheduleUpdate, listing.Schedules));

                        var operatorSql = "SELECT * FROM TourOperator WHERE ListingId = @listingId";
                        var tourOperators = await dbConnection.QueryAsync<TourOperator>(operatorSql, new { listingId = listing.Id});

                        var newOperators =
                            listing.TourOperators.Where(p => tourOperators.All(p2 => p2.UserId != p.UserId));
                        var oldOperators =
                            tourOperators.Where(p => listing.TourOperators.All(p2 => p2.UserId != p.UserId));
                        var newOperatorSql = "INSERT INTO TourOperator VALUES(@listingId, @userId, @isOwner)";
                        updateTasks.Add(dbConnection.ExecuteAsync(newOperatorSql, newOperators));

                        var oldOperatorSql =
                            "DELETE FROM TourOperator WHERE UserId = @userId AND ListingId = @listingId";
                        updateTasks.Add(dbConnection.ExecuteAsync(oldOperatorSql, oldOperators));

                        var guestSql = "SELECT * FROM TourGuest WHERE ListingId = @listingId";
                        var tourGuests = await dbConnection.QueryAsync<TourGuest>(guestSql, new { listingId = listing.Id });

                        var newGuests =
                            listing.TourGuests.Where(p => tourGuests.All(p2 => p2.ExistingUserId != p.ExistingUserId));
                        var oldGuests =
                            tourGuests.Where(p => listing.TourGuests.All(p2 => p2.ExistingUserId != p.ExistingUserId));
                        var newGuestSql = "INSERT INTO TourGuest VALUES(@listingId, @userId, @isPrimary)";
                        updateTasks.Add(dbConnection.ExecuteAsync(newGuestSql, newGuests));

                        var oldGuestSql =
                            "DELETE FROM TourGuest WHERE UserId = @userId AND ListingId = @listingId";
                        updateTasks.Add(dbConnection.ExecuteAsync(oldGuestSql, oldGuests));

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

        public async Task<int> InsertImage(int listingId, string url)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO Image(listingId, url, createdDate, isActive) "
                        + "VALUES (@listingId, @url, @createdDate, @isActive)";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, new { listingId = listingId, url = url, createdDate = DateTime.Now, isActive = true });
                return ret;
            }
        }

        public async Task<int> DeActivateListing(int listingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE Listing SET IsActive = 0 WHERE id = @listingId";
                dbConnection.Open();
                return await dbConnection.ExecuteAsync(sql,new {listingId});
            }
        }

        public async Task<IEnumerable<int>> GetListingIdByHeader(string header)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT Id FROM Listing WHERE Header like CONCAT(@header,'%')";
                dbConnection.Open();
                return await dbConnection.QueryAsync<int>(sql, new { header });
            }
        }

        public async Task<Image> GetImageByUrl(int listingId, string url)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT i.* FROM Image i INNER JOIN Listing l ON l.id = i.listingid WHERE i.listingid=@listingid AND i.url=@url";
                dbConnection.Open();
                var image = await dbConnection.QueryAsync<Image>(sql, new { listingId, url });
                return image.FirstOrDefault();
            }
        }

        public async Task<int> DeleteImage(int imageId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var deleteSql = "DELETE FROM Image WHERE imageId = @imageId";
                return await dbConnection.ExecuteAsync(deleteSql, new {imageId});
            }
        }

        public async Task<int> AddTourGuest(IList<Booking> bookings)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO TourGuest(listingId, existingUserId, isPrimary, firstName, lastName, email, phone, address, emergencyContact) "
                        + "VALUES(@listingId, @existingUserId, @isPrimary, @firstName, @lastName, @email, @phone, @address, @emergencyContact)";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, bookings );
                return ret;
            }

        }
    }
}
