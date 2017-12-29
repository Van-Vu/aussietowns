using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;

namespace FunWithLocal.WebApi.Model
{
    public class ArticleRequest
    {
        public int Id { get; set; }
        public ArticleStatus Status { get; set; }
    }
}
