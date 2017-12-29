using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FunWithLocal.WebApi.Model;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
{
    public class SettingsRepository: RepositoryBase, ISettingsRepository
    {
        private readonly ILogger<SettingsRepository> _logger;

        public SettingsRepository(string connString, ILogger<SettingsRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Hobby>> GetHobbies()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM hobbies WHERE visible = 1";

                dbConnection.Open();
                var hobbies = await dbConnection.QueryAsync<Hobby>(sql);

                return hobbies;
            }
        }
    }
}
