using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class BookingRequest
    {
        public int ListingId { get; set; }

        public DateTime BookingDate { get; set; }

        public TimeSpan Time { get; set; }
        public IList<User> Participants { get; set; }
    }
}
