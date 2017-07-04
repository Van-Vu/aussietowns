using System;

namespace AussieTowns.Model
{
    public class ConversationReply
    {
        public int Id { get; set; }
        public string MessageContent { get; set; }
        public int UserId { get; set; }
        public DateTime Time { get; set; }
        public int ConversationId { get; set; }
    }
}
