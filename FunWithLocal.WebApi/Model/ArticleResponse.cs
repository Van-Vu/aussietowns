using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;
using Newtonsoft.Json;

namespace FunWithLocal.WebApi.Model
{
    public class ArticleResponse
    {
        public int Id { get; set; }
        public ArticleCategory Category { get; set; }

        public ArticleStatus Status { get; set; }
        public MiniProfile Author { get; set; }

        public bool IsFeatured { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }

        public List<string> TagList => string.IsNullOrEmpty(Tags) ? new List<string>() : Tags.Split(',').ToList();

        [JsonIgnore]
        public string Tags { get; set; }
    }
}
