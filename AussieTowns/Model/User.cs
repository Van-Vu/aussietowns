using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public bool Gender { get; set; }
        //public DateTime DateOfBirth { get; set; }
        public string Phone{ get; set; }
        //public string PreferredLanguage { get; set; }
        public string Location { get; set; }
        //public string Description { get; set; }
    }
}
