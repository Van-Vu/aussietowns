using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using Dapper;
using FunWithLocal.WebApi.Model;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
{
    public class MessageRepository: RepositoryBase, IMessageRepository
    {
        private readonly ILogger<MessageRepository> _logger;

        public MessageRepository(string connString, ILogger<MessageRepository> logger):base(connString)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Conversation>> GetAllConversationsByUserId(int userId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT C.id, C.lastmessagetime, R.messageContent, U.*"
                        + "FROM user U, conversation C, conversation_reply R "
                        + "WHERE "
                        + "CASE "
                        + "WHEN C.userone = @userId "
                        + "THEN C.usertwo = U.id "
                        + "WHEN C.usertwo = @userId "
                        + "THEN C.userone = U.id "
                        + "END "
                        + "AND "
                        + "C.id = R.conversationId "
                        + "AND "
                        + "C.lastmessagetime = R.time "
                        + "AND "
                        + "(C.userone = @userId OR C.usertwo = @userId) "
                        + "GROUP BY U.id "
                        + "ORDER BY C.lastmessagetime DESC"; 
                dbConnection.Open();
                return  await dbConnection.QueryAsync<Conversation, User, Conversation>(sql, (conversation, user) =>
                {
                    //Bodom hack: deal later
                    conversation.UserTwo = new MiniProfile
                    {
                        Id = user.Id,
                        Fullname = $"{user.FirstName} {user.LastName}",
                        Email = user.Email,
                        //PhotoUrl = user.Images.Any() ? user.Images.FirstOrDefault().Url : "/static/images/anonymous.png"
                        PhotoUrl = "/static/images/anonymous.png"
                    };

                    return conversation;
                },  new {userId});
            }
        }

        public async Task<IEnumerable<ConversationReply>> GetMessagesInConversation(int conversationId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT R.id,R.time,R.messageContent, R.conversationId, U.id as userId FROM user U, conversation_reply R "
                          + "WHERE R.userId = U.id AND R.conversationId = @conversationId ORDER BY R.time DESC";

                dbConnection.Open();
                return await dbConnection.QueryAsync<ConversationReply>(sql, new { conversationId });
            }
        }

        public async Task<int> Insert(Message message)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var now = DateTime.Now;

                        var updateTasks = new List<Task<int>>();

                        var messageSql = "INSERT INTO conversation_reply(conversationId, messageContent, userId, time)"
                            + " VALUES(@conversationId, @messageContent, @userId, @time)";
                        updateTasks.Add(dbConnection.ExecuteAsync(messageSql, new {conversationId = message.ConversationId, messageContent = message.MessageContent, userId = message.UserId, time = now}));

                        var conversationSql = "UPDATE conversation SET lastMessageTime=@lastMessageTime WHERE id=@conversationId";
                        updateTasks.Add(dbConnection.ExecuteAsync(conversationSql, new {lastMessageTime = now, conversationId = message.ConversationId}));

                        await Task.WhenAll(updateTasks);

                        tran.Commit();
                        return 1;
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

        public async Task<int> InsertEnquiry(Enquiry enquiry)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var now = DateTime.Now;

                        var conversationSql = "INSERT INTO conversation(userOne, userTwo, lastMessageTime) VALUES (@senderId, @receiverId,@now);";
                        await dbConnection.ExecuteAsync(conversationSql, new{enquiry.SenderId, enquiry.ReceiverId, now});

                        var conversationId = Convert.ToInt16(await dbConnection.ExecuteScalarAsync("SELECT LAST_INSERT_ID()"));

                        var messageSql = "INSERT INTO conversation_reply(conversationId, messageContent, userId, time)"
                            + " VALUES(@conversationId, @messageContent, @userId, @time)";
                        await dbConnection.ExecuteAsync(messageSql, new { conversationId, messageContent = enquiry.Message, userId = enquiry.SenderId, time = now });

                        tran.Commit();
                        return 1;
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
