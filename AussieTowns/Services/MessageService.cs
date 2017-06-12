using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;

namespace AussieTowns.Services
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
    }
}
