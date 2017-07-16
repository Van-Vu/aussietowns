using System;
using System.Collections.Generic;
using System.Linq;
using AussieTowns.Common;
using Newtonsoft.Json;


namespace AussieTowns.Model
{
    public class Schedule
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime? EndDate { get; set; }
        public RepeatedType? RepeatedType { get; set; }
        public List<string> RepeatedDay { get; set; }
        public int ListingId { get; set; }
        [JsonIgnore]
        public string RepeatedDayText => string.Join(",", RepeatedDay?.ToArray());
    }
}
