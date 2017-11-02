using System;

namespace AussieTowns.Model
{
    public class Message
    {
        public int UserId { get; set; }
        public int ConversationId { get; set; }
        public string MessageContent { get; set; }
    }
}
