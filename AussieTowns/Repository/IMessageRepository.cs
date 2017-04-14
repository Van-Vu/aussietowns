using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IMessageRepository
    {
        Task<int> Insert(Message message);
        Task<IEnumerable<Conversation>> GetAllConversationsByUserId(int userId);
        Task<IEnumerable<Message>> GetMessagesInConversation(int conversationId);
    }
}
