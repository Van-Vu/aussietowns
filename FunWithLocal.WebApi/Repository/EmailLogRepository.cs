using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using Dapper;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
{
    public class EmailLogRepository: RepositoryBase, IEmailLogRepository
    {
        private readonly ILogger<EmailLogRepository> _logger;

        public EmailLogRepository(string connString, ILogger<EmailLogRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<int> LogEmail(IList<EmailLog> emails)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var sql = "INSERT INTO EmailLog(listingId,fromAddress,toAddress,subject,content,transactionid,messageid,status,createddate) "
                                  + "VALUES(@listingId,@fromAddress,@toAddress,@subject,@content,@transactionid,@messageid,@status,@createddate)";
                        var retValue = await dbConnection.ExecuteAsync(sql, emails);

                        tran.Commit();
                        return retValue;
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
