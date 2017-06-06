using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string Phone { get; set; }
        public int Language { get; set; }
        public int Currency { get; set; }
        public int LocationId { get; set; }
        public AutoCompleteItem LocationDetail { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public string PhotoUrl { get; set; }
        public string VideoUrl { get; set; }

        public ICollection<ListingSummary> OperatorListings { get; set; }
        public ICollection<ListingSummary> GuestListings { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
