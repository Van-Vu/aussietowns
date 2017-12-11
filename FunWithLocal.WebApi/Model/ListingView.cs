using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class ListingView
    {
        public int Id { get; set; }
        public ListingType Type { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public int MinParticipant { get; set; }

        public ListingUpsell Upsell { get; set; }

        public bool IsFeatured { get; set; }
        public string Schedules { get; set; }
        public string ImageUrls { get; set; }
        public int SuburbId { get; set; }
        public string SuburbName { get; set; }
        public int PostCode { get; set; }
        public string Area { get; set; }
        public string Region { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int OwnerId { get; set; }
        public bool IsOwner { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
    }
}
