using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using Newtonsoft.Json;

namespace FunWithLocal.WebApi.Model
{
    public class Article
    {
        public int Id { get; set; }
        public ArticleCategory Category { get; set; }

        public ArticleStatus Status { get; set; }
        public int AuthorId { get; set; }

        public User Author { get; set; }

        public bool IsFeatured { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }

        public List<string> TagList => string.IsNullOrEmpty(Tags) ? new List<string>() : Tags.Split(',').ToList();

        public string Tags { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
