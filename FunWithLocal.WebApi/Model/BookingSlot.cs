using System;
using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class BookingSlot
    {
        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public BookingStatus Status { get; set; }
    }
}
