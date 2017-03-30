using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.DataAccess;

namespace AussieTowns.Model
{
    public class Listing:IIdentifier
    {
        public int Id { get; set; }
        public ListingType Type { get; set; }
        public int LocationId { get; set; }
        public SuburbDetail Location { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public int MinParticipant { get; set; }

        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<TourOperator> TourOperators { get; set; }

        public ICollection<TourGuest> TourGuests { get; set; }
    }
}
