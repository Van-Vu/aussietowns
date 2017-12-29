using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FunWithLocal.WebApi.Model
{
    public class UserRequest
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string Phone { get; set; }
        public int LocationId { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public string Language { get; set; }
        public ICollection<string> Hobbies { get; set; }

        public string HobbyText => Hobbies == null ? string.Empty : string.Join(',', Hobbies);
        public bool IsConfirm { get; set; }

        [JsonIgnore]
        public DateTime UpdatedDate { get; set; }

    }
}
