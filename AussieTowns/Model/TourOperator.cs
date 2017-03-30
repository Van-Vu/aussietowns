using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace AussieTowns.Model
{
    public class TourOperator
    {
        public int ListingId { get; set; }
        public Listing Listing { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsOwner { get; set; }
    }
}
