﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class Booking
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan Time { get; set; }
        public int ExistingUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
        public bool IsPrimary { get; set; }
        public bool IsConfirmed { get; set; }
    }
}