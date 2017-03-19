using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.DataAccess;

namespace AussieTowns.Model
{
    public class TourRequest:IIdentifier
    {
        public int Id { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Location { get; set; }
        public int Budget { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public int MinParticipant { get; set; }

        public User User { get; set; }
    }
}
