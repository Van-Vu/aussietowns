using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface IMessageService
    {
        Task<int> SendMessage(Message message);

        Task<int> SendEnquiry(Enquiry enquiry);
        Task<IEnumerable<Conversation>> GetAllConversationsByUser(int userId);
        Task<IEnumerable<ConversationReply>> GetMessagesInConversation(int conversationId);
    }
}
