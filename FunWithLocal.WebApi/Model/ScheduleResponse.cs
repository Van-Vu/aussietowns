﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;

namespace AussieTowns.Model
{
    public class ScheduleResponse
    {
        public int Id { get; set; }
        public string StartDate { get; set; }
        public string StartTime { get; set; }
        public string Duration { get; set; }
        public string EndDate { get; set; }
        public RepeatedType? RepeatedType { get; set; }
        public List<string> RepeatedDay { get; set; }
    }
}
