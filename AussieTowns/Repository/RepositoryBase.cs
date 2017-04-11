using System.Data;
using MySql.Data.MySqlClient;

namespace AussieTowns.Repository
{
    public class RepositoryBase
    {
        private readonly string connectionString;
        public RepositoryBase(string connString)
        {
            connectionString = connString;
        }

        protected IDbConnection Connection => new MySqlConnection(connectionString);
    }
}
