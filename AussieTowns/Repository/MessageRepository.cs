using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using Dapper;
using NuGet.Packaging;

namespace AussieTowns.Repository
{
    public class MessageRepository: RepositoryBase, IMessageRepository
    {
        public MessageRepository(string connString):base(connString) {}

        public async Task<IEnumerable<Conversation>> GetAllConversationsByUserId(int userId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT C.id, C.lastmessagetime, U.* "
                        + "FROM user U,conversation C, conversation_reply R "
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
                        + "(C.userone = @userId OR C.usertwo = @userId) "
                        + "GROUP BY U.id "
                        + "ORDER BY C.lastmessagetime DESC"; 
                dbConnection.Open();
                return  await dbConnection.QueryAsync<Conversation, User,Conversation>(sql, (conversation, user) =>
                {
                    conversation.UserTwo = new MiniProfile
                    {
                        Id = user.Id,
                        Fullname = $"{user.FirstName} {user.LastName}",
                        Email = user.Email,
                        PhotoUrl = user.PhotoUrl
                    };

                    return conversation;
                },  new {userId});
            }
        }

        public async Task<IEnumerable<Message>> GetMessagesInConversation(int conversationId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM Message WHERE (senderId = @senderId AND recipientId= @recipientId)" 
                    + " OR (senderId = @recipientId AND recipientId= @senderId)";
                dbConnection.Open();
                return await dbConnection.QueryAsync<Message>(sql, new { conversationId});
            }
        }

        public async Task<int> Insert(Message message)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "INSERT INTO Message(senderId, recipientId, content, time, isSeen, isActive)"
                    +" VALUES(@senderId, @recipientId, @content, @time, @isSeen, @isActive)";
                dbConnection.Open();
                return await dbConnection.ExecuteAsync(sql,message);
            }
        }
    }
}
