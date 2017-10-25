using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;

namespace AussieTowns.Model
{
    public class BookingSlotResponse
    {
        public int ListingId { get; set; }
        public string BookingDate { get; set; }
        public string StartTime { get; set; }
        public BookingStatus Status { get; set; }
    }
}
