using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;

namespace FunWithLocal.WebApi.Services
{
    public class ArticleService: IArticleService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<Article> GetArticle(int articleId)
        {
            var article = await _articleRepository.GetArticle(articleId);

            article.Title = WebUtility.HtmlDecode(article.Title);
            article.Content = WebUtility.HtmlDecode(article.Content);

            return article;
        }

        public async Task<int> InsertArticle(Article article)
        {
            return await _articleRepository.InsertArticle(article);
        }

        public async Task<int> UpdateArticle(Article article)
        {
            return await _articleRepository.UpdateArticle(article);
        }

        public async Task<int> UpdateStatus(int articleId, ArticleStatus status)
        {
            return await _articleRepository.UpdateStatus(articleId, status);
        }

        public async Task<IEnumerable<Article>> GetFeatureArticles()
        {
            return await _articleRepository.GetFeatureArticles();
        }
    }
}
