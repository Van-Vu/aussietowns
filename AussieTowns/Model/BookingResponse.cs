using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class BookingResponse
    {
        public int Id { get; set; }

        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan StartTime { get; set; }

        public Listing Listing { get; set; }
        public IList<TourGuest> TourGuests { get; set; }
    }
}
