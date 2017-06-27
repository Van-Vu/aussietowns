using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns
{
    public class AppSettings
    {
        public string AwsS3Region { get; set; }
        public string AwsS3AccessKey { get; set; }
        public string AwsS3SecretKey { get; set; }
    }
}
