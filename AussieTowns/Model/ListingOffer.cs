using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class ListingOffer: Listing
    {
        public DateTime Time { get; set; }
        public int Participants { get; set; }
    }
}
