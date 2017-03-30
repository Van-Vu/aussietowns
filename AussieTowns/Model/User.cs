using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.DataAccess;

namespace AussieTowns.Model
{
    public class User: IIdentifier
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
        public string Location { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public string PhotoUrl { get; set; }
        public string VideoUrl { get; set; }

        public ICollection<TourOperator> TourOperators { get; set; }
        public ICollection<TourGuest> TourGuests { get; set; }
    }
}
