using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunWithLocal.WebApi.Model
{
    public class BookingApproval
    {
        public int ListingId { get; set; }
        public IList<int> BookingIds { get; set; }
    }
}
