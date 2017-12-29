using System;
using System.Collections.Generic;
using AussieTowns.Common;
using AussieTowns.Model;

namespace FunWithLocal.WebApi.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Salt { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string Phone { get; set; }
        public int Language { get; set; }
        public int Currency { get; set; }
        public int LocationId { get; set; }
        public SuburbDetail Location { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public string VideoUrl { get; set; }
        public string HeroImageUrl { get; set; }

        public string Hobbies { get; set; }

        public ICollection<ListingView> OperatorListings { get; set; }
        public ICollection<ListingView> GuestListings { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsConfirm { get; set; }
        public string Token { get; set; }
        public UserSource Source { get; set; }
        public string ExternalId { get; set; }
        public int Role { get; set; }

        public List<Image> Images { get; set; }
    }
}
