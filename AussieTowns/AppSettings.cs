﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns
{
    public class AppSettings
    {
        public string Environment { get; set; }
        public string AwsS3Region { get; set; }
        public string AwsS3AccessKey { get; set; }
        public string AwsS3SecretKey { get; set; }

        public string SqsUrl { get; set; }

        public string DefaultEmailAddress { get; set; }
        public string DefaultEmailName { get; set; }
        public string EmailTemplateFolder { get; set; }
        public string WelcomeEmailTemplate { get; set; }
        public string BookingGuestsEmailTemplate { get; set; }
        public string BookingHostsEmailTemplate { get; set; }
        public string WelcomeEmailSubject { get; set; }
        public string BookingEmailSubject { get; set; }
    }
}
