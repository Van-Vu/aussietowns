using System.Collections.Generic;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class ListingResponse
    {
        public int Id { get; set; }
        public ListingType Type { get; set; }
        public AutoCompleteItem LocationDetail { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public int MinParticipant { get; set; }

        public ListingUpsell Upsell { get; set; }
        public ICollection<ScheduleResponse> Schedules { get; set; }
        public ICollection<MiniProfile> TourOperators { get; set; }

        public ICollection<MiniProfile> TourGuests { get; set; }

        public ICollection<Image> ImageList { get; set; }
        

    }
}
