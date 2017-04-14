using System;

namespace AussieTowns.Model
{
    public class Message
    {
        public int Id { get; set; }
        public User SenderUser { get; set; }
        public int RecipientId { get; set; }
        public User RecipientUser { get; set; }
        public string MessageContent { get; set; }
    }
}
