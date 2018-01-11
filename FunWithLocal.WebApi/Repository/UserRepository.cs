using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Repository;
using Dapper;
using FunWithLocal.WebApi.Model;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
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
                          + "SELECT sd.* FROM SuburbDetail sd INNER JOIN User u ON sd.id = u.locationId WHERE u.id = @id;"
                          + "SELECT l.* FROM ListingView l INNER JOIN booking b ON b.listingId=l.id INNER JOIN tourguest g ON b.id = g.bookingId WHERE g.existingUserId = @id;"
                          + "SELECT l.* FROM ListingView l INNER JOIN touroperator o ON l.id = o.ListingId WHERE o.UserId = @id;"
                          + "SELECT * FROM Image i WHERE UserID = @id AND IsActive = true ORDER BY sortorder, createddate;";

                dbConnection.Open();
                using (var multipleResults = await dbConnection.QueryMultipleAsync(sql, new { id }))
                {
                    var user = multipleResults.Read<User>().FirstOrDefault();

                    var location = multipleResults.Read<SuburbDetail>().FirstOrDefault();

                    var guestListings = multipleResults.Read<ListingView>()?.ToList();
                    var operatorListings = multipleResults.Read<ListingView>()?.ToList();
                    var images = multipleResults.Read<Image>()?.ToList();

                    user.Location = location;
                    user.OperatorListings = operatorListings;
                    user.GuestListings= guestListings;
                    user.Images = images;
                    return user;
                }
            }
        }

        public async Task<IEnumerable<User>> SearchUser(string searchTerm)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User LEFT JOIN Image ON user.id=image.userid AND image.isActive = true WHERE firstname like CONCAT('%',@term,'%') OR lastname like CONCAT('%',@term,'%') OR email like CONCAT('%',@term,'%')";
                dbConnection.Open();
                return  await dbConnection.QueryAsync<User, Image, User>(sql, (user, image) =>
                {
                    user.Images = image != null ? new List<Image> {image} : null;
                    return user;
                }, new { term = searchTerm }, splitOn:"imageid");
            }
        }

        public async Task<int> Insert(User user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var userSql = "INSERT INTO User(Firstname, Lastname, email, salt, password, gender,birthday, phone, language, currency, locationId, description, address, emergencycontact, videourl, source, externalid, createdDate,updatedDate,isActive,role) "
                                + "VALUES (@firstname, @lastname, @email, @salt, @password, @gender, @birthday, @phone, @language, @currency, @locationId, @description, @address, @emergencycontact, @videourl, @source, @externalid, @createdDate,@updatedDate,@isActive,@role)";
                        user.CreatedDate = DateTime.Now;
                        user.UpdatedDate = DateTime.Now;
                        user.IsActive = true;
                        await dbConnection.ExecuteAsync(userSql, user);

                        var userId = Convert.ToInt16(await dbConnection.ExecuteScalarAsync("SELECT LAST_INSERT_ID()"));

                        var image = user.Images.FirstOrDefault();
                        if (image != null && user.Source != UserSource.Native)
                        {
                            var imageSql = "INSERT INTO Image(userId, url, createdDate, isActive, listingId) "
                                    + "VALUES (@userId, @url, @createdDate, @isActive,0)";
                            await dbConnection.ExecuteAsync(imageSql, new { userId, url = image.Url, createdDate = DateTime.Now, isActive = true });
                        }

                        tran.Commit();
                        return userId;
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

        public async Task<int> Update(UserRequest user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET firstname = @firstname, lastname = @lastname, email = @email, gender= @gender, birthday= @birthday, phone = @phone, language= @language, "
                    + "hobbies=@hobbyText, locationId = @locationId, description = @description, address= @address, emergencycontact= @emergencycontact, updatedDate=@updatedDate, isConfirm=@isConfirm WHERE id = @Id";
                dbConnection.Open();
                user.UpdatedDate = DateTime.Now;
                return await dbConnection.ExecuteAsync(sql, user);
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

        public async Task<User> GetByIdAndEmail(int id, string email)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE id=@id AND email=@email AND isConfirm =0;";

                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql, new { id, email });
                return user.FirstOrDefault();
            }
        }

        public async Task<User> GetByEmail(string email)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM User WHERE email=@email;";

                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql, new { email });
                return user.FirstOrDefault();
            }
        }

        public async Task<int> ConfirmEmail(UserRequest user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET firstname = @firstname, lastname = @lastname, "
                    + "updatedDate=@updatedDate, isConfirm=1 WHERE id = @Id";
                dbConnection.Open();
                user.UpdatedDate = DateTime.Now;
                return await dbConnection.ExecuteAsync(sql, user);
            }
        }
    }
}
