using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class TourGuest
    {
        public int ListingId { get; set; }
        public Listing Listing { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
