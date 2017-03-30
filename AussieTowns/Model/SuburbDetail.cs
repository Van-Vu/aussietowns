using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace AussieTowns.Model
{

    // suburbfullname, suburbname, state, postcode, detail, latitude, longitude
    public class SuburbDetail
    {
        public int Id { get; set; }
        public string SuburbName { get; set; }
        public string State { get; set; }
        public int Postcode { get; set; }
        public int Level { get; set; }
        public string Detail { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public ICollection<Listing> Listings { get; set; }

    }
}
