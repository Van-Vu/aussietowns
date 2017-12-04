using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunWithLocal.WebApi.Model
{
    public class Enquiry
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int ListingId { get; set; }
        public string Message { get; set; }

    }
}
