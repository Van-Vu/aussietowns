using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface IMessageRepository
    {
        Task<int> Insert(Message message);

        Task<int> InsertEnquiry(Enquiry enquiry);
        Task<IEnumerable<Conversation>> GetAllConversationsByUserId(int userId);
        Task<IEnumerable<ConversationReply>> GetMessagesInConversation(int conversationId);
    }
}
