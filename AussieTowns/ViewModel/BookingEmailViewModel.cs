using System.Collections.Generic;

namespace AussieTowns.ViewModel
{
    public class BookingEmailViewModel
    {
        public string EmailHeader { get; set; }
        public string ListingUrl { get; set; }
        public string ListingHeader { get; set; }
        public string ListingDescription { get; set; }
        public string BookingDate { get; set; }
        public string BookingTime { get; set; }

        public List<BookingParticipant> BookingParticipants { get; set; }
    }

    public class BookingParticipant
    {
        public string Fullname { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
