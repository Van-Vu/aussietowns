using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Model
{
    public class MiniProfile
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string ProfileUrl { get; set; }
        public string PhotoUrl { get; set; }
        public string ShortDescription { get; set; }
        public bool IsPrimary { get; set; }
    }
}
