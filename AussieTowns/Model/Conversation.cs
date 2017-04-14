using System;

namespace AussieTowns.Model
{
    public class Conversation
    {
        public int Id { get; set; }
        public int UserOneId { get; set; }
        public MiniProfile UserOne { get; set; }
        public int UserTwoId { get; set; }
        public MiniProfile UserTwo { get; set; }
        public DateTime LastMessageTime { get; set; }
    }
}
