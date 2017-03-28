using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class Listing
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Location { get; set; }
        public string PrimaryOwner { get; set; }
    }
}
