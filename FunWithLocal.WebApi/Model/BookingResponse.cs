using System;
using System.Collections.Generic;
using AussieTowns.Model;

namespace FunWithLocal.WebApi.Model
{
    public class BookingResponse
    {
        public int Id { get; set; }

        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }

        public ListingResponse Listing { get; set; }
        public IList<TourGuest> Participants { get; set; }
    }
}
