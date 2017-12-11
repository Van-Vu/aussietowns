using FunWithLocal.WebApi.Model;

namespace AussieTowns.Model
{
    public class TourOperator
    {
        public int ListingId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsPrimary { get; set; }
    }
}
