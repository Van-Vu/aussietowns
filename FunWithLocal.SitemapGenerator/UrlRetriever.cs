using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using MySql.Data.MySqlClient;

namespace FunWithLocal.SitemapGenerator
{
    public interface IUrlRetriever
    {
        IEnumerable<ContentView> GetListingUrls();
        IEnumerable<ContentView> GetArticleUrls();
        IEnumerable<dynamic> Test();
    }

    public class UrlRetriever : IUrlRetriever
    {
        protected IDbConnection Connection;
        public UrlRetriever(string connString)
        {
            Connection = new MySqlConnection(connString);
        }

        public IEnumerable<dynamic> Test()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM Listing";
                dbConnection.Open();
                return dbConnection.Query<dynamic>(sql);
            }
        }

        public IEnumerable<ContentView> GetListingUrls()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT id, header FROM ListingView";
                dbConnection.Open();
                return dbConnection.Query<ContentView>(sql);
            }
        }

        public IEnumerable<ContentView> GetArticleUrls()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT id, title as header FROM article WHERE status=@status";
                dbConnection.Open();
                return dbConnection.Query<ContentView>(sql, new {status = 1});
            }
        }
    }
}
