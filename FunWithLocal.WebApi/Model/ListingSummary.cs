﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using FunWithLocal.WebApi.Common;

namespace AussieTowns.Model
{
    public class ListingSummary
    {
        public int Id { get; set; }
        public ListingType Type { get; set; }
        public string Location { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public int MinParticipant { get; set; }
        public string PrimaryOwner { get; set; }
        public string ImageUrls { get; set; }
        public string SeoUrl { get; set; }
        public IEnumerable<Schedule> Schedules { get; set; }

    }
}
