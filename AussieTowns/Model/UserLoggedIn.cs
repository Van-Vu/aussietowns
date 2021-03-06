﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class UserLoggedIn
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string EmergencyContact { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Role { get; set; }
        public string PhotoUrl { get; set; }
    }
}
