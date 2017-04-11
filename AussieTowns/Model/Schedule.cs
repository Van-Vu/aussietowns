using System;
using AussieTowns.Common;


namespace AussieTowns.Model
{
    public class Schedule
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime? EndDate { get; set; }
        public RepeatedType? RepeatedType { get; set; }

        public int ListingId { get; set; }
    }
}
