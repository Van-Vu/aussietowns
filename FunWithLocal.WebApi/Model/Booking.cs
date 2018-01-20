using System;
using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class Booking
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public int GuestId { get; set; }
        public bool IsConfirmed { get; set; }

        public BookingStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
