using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;

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
                var sql = "SELECT l.*,s.startDate, s.enddate, s.duration, s.repeatedtype, s.listingid from Listing l inner join Schedule s on l.id = s.listingid";
                dbConnection.Open();

                
                var existingListing = await dbConnection.QueryAsync<Listing,Schedule,Listing >(sql,
                            (listing, schedule) =>
                            {
                                listing.Schedules = listing.Schedules ?? new List<Schedule>();
                                if (schedule != null)
                                {
                                    listing.Schedules.Add(schedule);
                                }
                                return listing;
                            },
                            splitOn: "ListingId");
                return existingListing.FirstOrDefault();
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
                return await dbConnection.QueryAsync<ListingView>(sql,new {suburbId});
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
                        var sql = "INSERT INTO Listing(type,locationid,cost,currency, header, description, requirement, minparticipant) "
                                + "VALUES(@type, @locationid, @cost, @currency, @header, @description, @requirement, @minparticipant);"
                                + "SELECT LAST_INSERT_ID()";
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
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var sql = "UPDATE Listing SET LocationId = @locationId, Cost = @cost, Currency = @currency, Header = @header, Description = @description, "
                                  + "Requirement = @requirement, MiParticipant = @minParticipant WHERE ListingId = @id";
                        dbConnection.Open();
                        await dbConnection.ExecuteAsync(sql, listing);

                        var scheduleUpdate =
                            "UPDATE Schedule SET Startdate = @startDate, Duration = @duration, Enddate = @endDate, RepeatedType = @repeatedType WHERE Id=@id";
                        await dbConnection.ExecuteAsync(scheduleUpdate, listing.Schedules);

                        var operatorSql = "SELECT * FROM TourOperator WHERE ListingId = @listingId";
                        var tourOperators = await dbConnection.QueryAsync<TourOperator>(operatorSql,
                            new {userId = listing.Id});

                        var newOperators =
                            listing.TourOperators.Where(p => tourOperators.All(p2 => p2.ListingId != p.ListingId));
                        var oldOperators =
                            tourOperators.Where(p => listing.TourOperators.All(p2 => p2.ListingId != p.ListingId));
                        var newOperatorSql = "INSERT INTO TourOperator VALUES(@userId, @listingId, @isOwner)";
                        await dbConnection.ExecuteAsync(newOperatorSql, newOperators);

                        var oldOperatorSql =
                            "DELETE FROM TourOperator WHERE UserId = @userId AND ListingId = @listingId";
                        await dbConnection.ExecuteAsync(oldOperatorSql, oldOperators);

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

        public async Task<int> DeleteListing(int listingId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE Listing SET IsActive = 0 WHERE ListingId = @listingId";
                dbConnection.Open();
                return await dbConnection.ExecuteAsync(sql,new {listingId});
            }
        }
    }
}
