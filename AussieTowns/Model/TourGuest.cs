using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class TourGuest
    {
        public int TourOfferId { get; set; }
        public TourOffer TourOffer { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
