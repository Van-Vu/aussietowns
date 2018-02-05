using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FunWithLocal.WebApi.Model
{
    public class ArticleCard
    {
        public int Id { get; set; }
        public string PrimaryOwner { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string ImageUrls { get; set; }
        public string SeoUrl { get; set; }
        public List<string> TagList => string.IsNullOrEmpty(Tags) ? new List<string>() : Tags.Split(',').ToList();

        [JsonIgnore]
        public string Tags { get; set; }
    }
}
