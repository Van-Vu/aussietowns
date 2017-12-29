using System.Data;
using MySql.Data.MySqlClient;

namespace FunWithLocal.WebApi.Repository
{
    public class RepositoryBase
    {
        private readonly string _connectionString;
        public RepositoryBase(string connString)
        {
            _connectionString = connString;
        }

        protected IDbConnection Connection => new MySqlConnection(_connectionString);
    }
}
