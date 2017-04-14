using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IMessageService
    {
        Task<int> SendMessage(Message message);
        Task<IEnumerable<Conversation>> GetAllConversationsByUser(int userId);
        Task<IEnumerable<Message>> GetMessagesInConversation(int conversationId);
    }
}
