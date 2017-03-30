using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class Schedule
    {
        public int Id { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public bool IsFullday { get; set; }

        public int ListingId { get; set; }
        public Listing Listing { get; set; }
    }
}
