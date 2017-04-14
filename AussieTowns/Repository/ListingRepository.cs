using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;
using Newtonsoft.Json;
using NuGet.Packaging;

namespace AussieTowns.Repository
{
    public class ListingRepository: RepositoryBase, IListingRepository
    {
        public ListingRepository(string connString): base(connString)
        {}

        public async Task<Listing> GetListingById(int listingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM listing WHERE id = @listingid; "
                          + "SELECT sd.* FROM SuburbDetail sd INNER JOIN Listing l ON sd.id = l.locationId WHERE l.id = @listingid;"
                          + "SELECT s.* FROM Schedule s INNER JOIN Listing l ON s.listingid = l.id WHERE ListingId = @listingid;"
                          + "SELECT * FROM TourOperator o INNER JOIN User u ON o.userid = u.id WHERE ListingId = @listingid;"
                          + "SELECT * FROM TourGuest g INNER JOIN User u ON g.userid = u.id WHERE ListingId = @listingId";

                dbConnection.Open();
                using (var multipleResults = await dbConnection.QueryMultipleAsync(sql, new {listingId = listingId}))
                {
                    var listing = multipleResults.Read<Listing>().FirstOrDefault();

                    var location = multipleResults.Read<SuburbDetail>().FirstOrDefault();
                    var schedules = multipleResults.Read<Schedule>().ToList();
                    var operators = multipleResults.Read<TourOperator,User, TourOperator>((tourOperator, user) =>
                    {
                        if (user != null)
                        {
                            tourOperator.User = user;
                        }

                        return tourOperator;
                    }).ToList();
                    var guests = multipleResults.Read<TourGuest,User,TourGuest>((tourguest, user) =>
                    {
                        if (user != null) tourguest.User = user;

                        return tourguest;
                    }).ToList();

                    listing.Schedules = listing.Schedules ?? new List<Schedule>();
                    listing.Schedules.AddRange(schedules);

                    listing.TourOperators = listing.TourOperators ?? new List<TourOperator>();
                    listing.TourOperators.AddRange(operators);

                    listing.TourGuests = listing.TourGuests?? new List<TourGuest>();
                    listing.TourGuests.AddRange(guests);

                    listing.Location = location;

                    return listing;
                }
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

                        foreach (var schedule in listing.Schedules)
                        {
                            schedule.ListingId = listingId;
                        }
                        var scheduleSql =
                            "INSERT INTO Schedule(startdate, duration, enddate, repeatedtype,listingid) "
                            + " VALUES(@startDate, @duration, @endDate, @repeatedType, @listingId)";
                        await dbConnection.ExecuteAsync(scheduleSql, listing.Schedules);

                        foreach (var tourOperator in listing.TourOperators)
                        {
                            tourOperator.ListingId = listingId;
                        }
                        var operatorSql = "INSERT INTO TourOperator(userid, listingid, isowner) " 
                            + " VALUES(@userId, @listingId, @isOwner)";
                        await dbConnection.ExecuteAsync(operatorSql, listing.TourOperators);

                        foreach (var tourGuest in listing.TourGuests)
                        {
                            tourGuest.ListingId = listingId;
                        }
                        var guestSql = "INSERT INTO TourGuest(userid, listingid, isowner) " 
                            + "VALUES(@userId, @listingId, @isOwner)";
                        await dbConnection.ExecuteAsync(guestSql, listing.TourGuests);

                        tran.Commit();
                        return listingId;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
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
                        var sql = "UPDATE Listing SET LocationId = @locationId, Cost = @cost, Currency = @currency, Header = @header, Description = @description, "
                                  + "Requirement = @requirement, MinParticipant = @minParticipant, updatedDate=@updatedDate, isActive=@isActive WHERE Id = @id";
                        listing.UpdatedDate = DateTime.Now;
                        listing.IsActive = true;
                        await dbConnection.ExecuteAsync(sql, listing);

                        var scheduleUpdate =
                            "UPDATE Schedule SET Startdate = @startDate, Duration = @duration, Enddate = @endDate, RepeatedType = @repeatedType WHERE Id=@id";
                        await dbConnection.ExecuteAsync(scheduleUpdate, listing.Schedules);

                        var operatorSql = "SELECT * FROM TourOperator WHERE ListingId = @listingId";
                        var tourOperators = await dbConnection.QueryAsync<TourOperator>(operatorSql, new { listingId = listing.Id});

                        var newOperators =
                            listing.TourOperators.Where(p => tourOperators.All(p2 => p2.ListingId != p.ListingId));
                        var oldOperators =
                            tourOperators.Where(p => listing.TourOperators.All(p2 => p2.ListingId != p.ListingId));
                        var newOperatorSql = "INSERT INTO TourOperator VALUES(@listingId, @userId, @isOwner)";
                        await dbConnection.ExecuteAsync(newOperatorSql, newOperators);

                        var oldOperatorSql =
                            "DELETE FROM TourOperator WHERE UserId = @userId AND ListingId = @listingId";
                        await dbConnection.ExecuteAsync(oldOperatorSql, oldOperators);

                        var guestSql = "SELECT * FROM TourGuest WHERE ListingId = @listingId";
                        var tourGuests = await dbConnection.QueryAsync<TourGuest>(guestSql, new { listingId = listing.Id });

                        var newGuests =
                            listing.TourGuests.Where(p => tourGuests.All(p2 => p2.UserId != p.UserId));
                        var oldGuests =
                            tourGuests.Where(p => listing.TourGuests.All(p2 => p2.UserId != p.UserId));
                        var newGuestSql = "INSERT INTO TourGuest VALUES(@listingId, @userId, @isOwner)";
                        await dbConnection.ExecuteAsync(newGuestSql, newGuests);

                        var oldGuestSql =
                            "DELETE FROM TourGuest WHERE UserId = @userId AND ListingId = @listingId";
                        await dbConnection.ExecuteAsync(oldGuestSql, oldGuests);

                        //Bodom
                        tran.Commit();
                        return 1;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        throw;
                    }
                }
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
    }
}
