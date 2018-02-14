using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public interface IArticleService
    {
        Task<Article> GetArticle(int articleId);

        Task<IEnumerable<Article>> GetFeatureArticles(IDevice device);
        Task<int> InsertArticle(Article article);
        Task<int> UpdateArticle(Article article);
    }
}
