using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Repository
{
    public class ImageRepository: RepositoryBase, IImageRepository
    {
        private readonly ILogger<ImageRepository> _logger;

        public ImageRepository(string connString, ILogger<ImageRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<int> InsertListingImage(int listingId, string url)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO Image(listingId, url, createdDate, isActive) "
                        + "VALUES (@listingId, @url, @createdDate, @isActive)";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, new {listingId, url, createdDate = DateTime.Now, isActive = true });
                return ret;
            }
        }

        public async Task<int> InsertProfileImage(int profileId, string url)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE Image SET isActive = false WHERE userId = @profileId AND isActive = true; "
                        + "INSERT INTO Image(userId, url, createdDate, isActive, listingId) "
                        + "VALUES (@profileId, @url, @createdDate, @isActive,0)";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, new {profileId, url, createdDate = DateTime.Now, isActive = true });
                return ret;
            }
        }

        public async Task<int> InsertHeroImage(int profileId, string url)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "UPDATE User SET heroImageUrl = @heroImageUrl, updatedDate = NOW()"
                        + "WHERE id = @userId";
                dbConnection.Open();
                var ret = await dbConnection.ExecuteAsync(sql, new { userId = profileId, heroImageUrl = url});
                return ret;
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
                return await dbConnection.ExecuteAsync(deleteSql, new { imageId });
            }
        }
    }
}
