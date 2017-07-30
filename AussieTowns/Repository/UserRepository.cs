using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Repository
{
    public class UserRepository: RepositoryBase, IUserRepository
    {
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(string connString, ILogger<UserRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<User> GetByEmailAndPassword(string email, string password)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE email=@email AND password=@password";
                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql,new {email, password});
                return user.FirstOrDefault();
            }
        }

        public async Task<User> GetById(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE id=@id;"
                          +
                          "SELECT sd.* FROM SuburbDetail sd INNER JOIN User u ON sd.id = u.locationId WHERE u.id = @id;"
                          +
                          "SELECT * FROM ListingView l INNER JOIN tourguest g ON l.id = g.ListingId WHERE g.existingUserId = @id;"
                          +
                          "SELECT * FROM ListingView l INNER JOIN touroperator o ON l.id = o.ListingId WHERE o.UserId = @id;";

                dbConnection.Open();
                using (var multipleResults = await dbConnection.QueryMultipleAsync(sql, new { id }))
                {
                    var user = multipleResults.Read<User>().FirstOrDefault();

                    var location = multipleResults.Read<SuburbDetail>().FirstOrDefault();

                    var operatorListings = multipleResults.Read<ListingView>()?.ToList();
                    var guestListings = multipleResults.Read<ListingView>()?.ToList();

                    user.Location = location;
                    user.OperatorListings = operatorListings;
                    user.GuestListings= guestListings;
                    return user;
                }
            }
        }

        public async Task<IEnumerable<User>> SearchUser(string searchTerm)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE firstname like CONCAT('%',@term,'%') OR lastname like CONCAT('%',@term,'%') OR email like CONCAT('%',@term,'%')";
                dbConnection.Open();
                return  await dbConnection.QueryAsync<User>(sql, new { term = searchTerm });
            }
        }

        public async Task<int> Insert(User user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO User(Firstname, Lastname, email, salt, password, gender,birthday, phone, language, currency, locationId, description, address, emergencycontact, photourl, videourl,source, externalid, createdDate,updatedDate,isActive) "
                        + "VALUES (@firstname, @lastname, @email, @salt, @password, @gender, @birthday, @phone, @language, @currency, @locationId, @description, @address, @emergencycontact, @photourl, @videourl, @source, @externalid, @createdDate,@updatedDate,@isActive)";
                dbConnection.Open();
                user.CreatedDate = DateTime.Now;
                user.UpdatedDate = DateTime.Now;
                user.IsActive = true;
                var ret = await dbConnection.ExecuteAsync(sql,user);
                return ret;
            }
        }

        public async Task<int> Update(Profile profile)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET firstname = @firstname, lastname = @lastname, email = @email, gender= @gender, birthday= @birthday, phone = @phone, language= @language, currency = @currency, "
                    + "locationId = @locationId, description = @description, address= @address, emergencycontact= @emergencycontact, updatedDate=@updatedDate WHERE id = @Id";
                dbConnection.Open();
                profile.UpdatedDate = DateTime.Now;
                return await dbConnection.ExecuteAsync(sql, profile);
            }
        }

        public async Task<int> Deactivate(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET IsActive = 0 WHERE id = @id";
                dbConnection.Open();

                return await dbConnection.ExecuteAsync(sql,new {id});
            }
        }

        public async Task<User> GetByExternalInfo(string email, int source, string externalId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE email=@email AND source=@source AND externalid=@externalId";
                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql, new { email, source,externalId });
                return user.FirstOrDefault();
            }
        }

        public async Task<User> GetUserByResetToken(string resetToken)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT U.* FROM User U INNER JOIN UserReset R ON R.userId = U.id WHERE R.resetToken = @resetToken AND R.isActive = 1;";
                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql, new { resetToken });
                return user.FirstOrDefault();
            }
        }

        public async Task<int> RequestPasswordReset(int userId, string resetToken, DateTime expiryDate)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO UserReset(UserId, ResetToken, ExpiryDate, IsActive)"
                        + "VALUES (@userId, @resetToken, @expiryDate, @isActive)";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, new {userId, resetToken, expiryDate, isActive= 1});
                return ret;
            }
        }

        public async Task<int> ChangePassword(User user, bool isChangePassword)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();

                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var updateList = new List<Task<int>>();

                        var userSql = "UPDATE User SET salt = @salt, password = @password, updatedDate = @updatedDate, source=@source WHERE id = @Id;";
                        updateList.Add(dbConnection.ExecuteAsync(userSql, user));

                        if (!isChangePassword)
                        {
                            var userResetSql = "UPDATE UserReset SET isActive = @isActive, expiryDate = @expiryDate WHERE userId = @userId;";
                            updateList.Add(dbConnection.ExecuteAsync(userResetSql, new { isActive = 0, expiryDate = user.UpdatedDate, userId = user.Id }));
                        }

                        await Task.WhenAll(updateList);

                        tran.Commit();
                        return 2;
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
    }
}
