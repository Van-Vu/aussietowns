using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunWithLocal.WebApi.Common
{

    public class ImageSettings
    {
        public string Desktop { get; set; }
        public string Tablet { get; set; }
        public string Mobile { get; set; }
    }

    public class CloudinarySettings
    {
        public string BaseUrl { get; set; }
        public ImageSettings Listing { get; set; }
        public ImageSettings UserProfile { get; set; }
        public ImageSettings UserHeroImage { get; set; }
        public ImageSettings ListingCard { get; set; }
    }
}
