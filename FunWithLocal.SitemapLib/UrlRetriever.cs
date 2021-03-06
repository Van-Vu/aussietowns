﻿using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;

namespace FunWithLocal.SitemapLib
{
    public interface IUrlRetriever
    {
        Task<IEnumerable<ContentView>> GetListingUrls();
        Task<IEnumerable<ContentView>> GetArticleUrls();
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
                var sql = "SELECT * FROM Listing WHERE is";
                dbConnection.Open();
                return dbConnection.Query<dynamic>(sql);
            }
        }

        public async Task<IEnumerable<ContentView>> GetListingUrls()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT id, header, url FROM Listing INNER JOIN Image ON Image.listingid = Listing.id AND Image.isActive = 1 AND " + 
                        "Image.imageid = (SELECT imageid FROM Image WHERE Image.ListingId = Listing.Id LIMIT 1) WHERE Listing.isActive = 1; ";
                dbConnection.Open();
                return await dbConnection.QueryAsync<ContentView>(sql);
            }
        }

        public async Task<IEnumerable<ContentView>> GetArticleUrls()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT id, title as header, imageUrl as url  FROM article WHERE status=@status";
                dbConnection.Open();
                return await dbConnection.QueryAsync<ContentView>(sql, new {status = 1});
            }
        }
    }
}
