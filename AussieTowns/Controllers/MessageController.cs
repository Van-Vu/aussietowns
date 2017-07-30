using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class MessageController
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;
        private readonly ILogger<MessageController> _logger;

        public MessageController(IMessageService messageService, IMapper mapper, ILogger<MessageController> logger)
        {
            _messageService = messageService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IEnumerable<Conversation>>  GetConversationsByUser(int userId)
        {
            try
            {
                if (userId < 10000) throw new ValidationException(nameof(userId));

                return await _messageService.GetAllConversationsByUser(userId);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet]
        [Route("conversation/{conversationId}")]
        //[Authorize]
        public async Task<IEnumerable<ConversationReply>> GetMessagesInConversation(int conversationId)
        {
            try
            {
                if (conversationId < 0) throw new ValidationException(nameof(conversationId));

                return await _messageService.GetMessagesInConversation(conversationId);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost]
        [Route("conversation")]
        public async Task<int> SendMessage([FromBody] Message message)
        {
            try
            {
                if (message == null) throw new ArgumentNullException(nameof(message));

                return await _messageService.SendMessage(message);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
    }
}
