using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;

namespace AussieTowns.Repository
{
    public class MessageRepository: RepositoryBase, IMessageRepository
    {
        public MessageRepository(string connString):base(connString) {}

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
                var sql = "INSERT INTO conversation_reply(conversationId, messageContent, userId, time)"
                    + " VALUES(@conversationId, @messageContent, @userId, NOW())";
                dbConnection.Open();
                return await dbConnection.ExecuteAsync(sql,message);
            }
        }
    }
}
