using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Repository
{
    public class LocationRepository: RepositoryBase, ILocationRepository
    {
        private readonly ILogger _logger;

        public LocationRepository(string connString, ILogger<LocationRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public IEnumerable<SuburbDetail> GetLocationsByBoundingBox()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "";
                dbConnection.Open();
                return dbConnection.Query<SuburbDetail>(sql);
            }
        }

        public async Task<IEnumerable<SuburbDetail>> GetLocationBySuburbName(string suburbName)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM SuburbDetail WHERE suburbname like CONCAT('%',@name,'%') LIMIT 10";
                dbConnection.Open();
                return await dbConnection.QueryAsync<SuburbDetail>(sql, new { name = suburbName });
            }
        }

        public Task<int> TestLogger()
        {
            _logger.LogError("from Location Repository");

            return null;
        }
    }
}