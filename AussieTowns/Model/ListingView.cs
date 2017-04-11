using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class ListingView
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public int MinParticipant { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime EndDate { get; set; }
        public int RepeatedType { get; set; }
        public int SuburbId { get; set; }
        public string SuburbName { get; set; }
        public int PostCode { get; set; }
        public string Area { get; set; }
        public string Region { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int OperatorId { get; set; }
        public bool IsOwner { get; set; }
        public string OperatorName { get; set; }
        public string OperatorEmail { get; set; }
        public int GuestId { get; set; }
        public string GuestName { get; set; }
        public string GuestEmail { get; set; }
    }
}
