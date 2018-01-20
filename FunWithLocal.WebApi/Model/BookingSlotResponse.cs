using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class BookingSlotResponse
    {
        public int ListingId { get; set; }
        public string BookingDate { get; set; }
        public string StartTime { get; set; }
        public BookingStatus Status { get; set; }
    }
}
