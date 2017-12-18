using System;
using System.Collections.Generic;
using AussieTowns.Model;

namespace FunWithLocal.WebApi.Model
{
    public class BookingRequest
    {
        public int ListingId { get; set; }
        public int BookingId { get; set; }

        public DateTime BookingDate { get; set; }

        public TimeSpan Time { get; set; }
        public IList<TourGuest> Participants { get; set; }
    }
}
