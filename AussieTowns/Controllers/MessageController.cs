using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class MessageController
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public MessageController(IMessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<RequestResult> Send([FromBody] Message message)
        {
            try
            {
                if (message== null)
                {
                    throw new Exception("Value cannot be null !");
                }
                await _messageService.SendMessage(message);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Msg = "Update successful"
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Send failed:" + ex.Message
                };
            }
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<RequestResult>  GetConversationsByUser(int userId)
        {
            try
            {
                var messages = await _messageService.GetAllConversationsByUser(userId);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = messages
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Get conversation failed:" + ex.Message
                };
            }
        }

        [HttpGet]
        [Route("conversation/{conversationId}")]
        [Authorize]
        public async Task<RequestResult> GetMessagesInConversation(int conversationId)
        {
            try
            {
                var messages = await _messageService.GetMessagesInConversation(conversationId);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = messages
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Get messages failed:" + ex.Message
                };
            }
        }

    }
}
