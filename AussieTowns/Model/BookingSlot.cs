using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;

namespace AussieTowns.Model
{
    public class BookingSlot
    {
        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public BookingStatus Status { get; set; }
    }
}
