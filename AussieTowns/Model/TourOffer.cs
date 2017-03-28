using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.DataAccess;

namespace AussieTowns.Model
{
    public class TourOffer:IIdentifier
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int LocationId { get; set; }
        public SuburbDetail Location { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public bool IsFullday { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public int MinParticipant { get; set; }

        public ICollection<TourOperator> TourOperators { get; set; }

        public ICollection<TourGuest> TourGuests { get; set; }

    }
}
