using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;

namespace AussieTowns.Repository
{
    public class UserRepository: RepositoryBase, IUserRepository
    {
        public UserRepository(string connString): base(connString)
        {}

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
                var sql = "SELECT * FROM User WHERE id=@id";
                dbConnection.Open();
                var user = await dbConnection.QueryAsync<User>(sql,new {id});

                return user.FirstOrDefault();
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
                var sql = "INSERT INTO User(Firstname, Lastname, email, password, gender,birthday, phone, language, currency, location, description, address, emergencycontact, photourl, videourl,createdDate,updatedDate,isActive) "
                        + "VALUES (@firstname, @lastname, @email, @password, @gender, @birthday, @phone, @language, @currency, @location, @description, @address, @emergencycontact, @photourl, @videourl,@createdDate,@updatedDate,@isActive)";
                dbConnection.Open();
                user.CreatedDate = DateTime.Now;
                user.UpdatedDate = DateTime.Now;
                user.IsActive = true;
                var ret = await dbConnection.ExecuteAsync(sql,user);
                return ret;
            }
        }

        public async Task<int> Update(User user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET firstname = @firstname, lastname = @lastname, email = @email, password= @password, gender= @gender, birthday= @birthday, phone = @phone, language= @language, currency = @currency, "
                    + "location = @location, description = @description, address= @address, emergencycontact= @emergencycontact, photourl = @photourl, videorl = @videourl, updatedDate=@updatedDate, isActive=@isActive WHERE id = @Id";
                dbConnection.Open();
                user.UpdatedDate = DateTime.Now;
                user.IsActive = true;
                return await dbConnection.ExecuteAsync(sql,user);
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
    }
}
