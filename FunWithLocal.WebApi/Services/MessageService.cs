using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;

namespace FunWithLocal.WebApi.Services
{
    public class MessageService: IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public async Task<IEnumerable<Conversation>> GetAllConversationsByUser(int userId)
        {
            return await _messageRepository.GetAllConversationsByUserId(userId);
        }

        public async Task<IEnumerable<ConversationReply>> GetMessagesInConversation(int conversationId)
        {
            return await _messageRepository.GetMessagesInConversation(conversationId);
        }

        public async Task<int> SendMessage(Message message)
        {
            return await _messageRepository.Insert(message);
        }

        public async Task<int> SendEnquiry(Enquiry enquiry)
        {
            return await _messageRepository.InsertEnquiry(enquiry);
        }
    }
}
