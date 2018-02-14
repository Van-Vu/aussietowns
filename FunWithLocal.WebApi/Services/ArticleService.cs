using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public class ArticleService: IArticleService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IImageStorageService _imageStorageService;

        public ArticleService(IArticleRepository articleRepository, IImageStorageService imageStorageService)
        {
            _articleRepository = articleRepository;
            _imageStorageService = imageStorageService;
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

        public async Task<IEnumerable<Article>> GetFeatureArticles(IDevice device)
        {
            var articles = (await _articleRepository.GetFeatureArticles()).ToList();

            foreach (var article in articles)
            {
                article.Title = WebUtility.HtmlDecode(article.Title);
                article.Content = WebUtility.HtmlDecode(article.Content);
                article.ImageUrl = _imageStorageService.TransformImageUrls(article.ImageUrl, ImageType.ListingCard, device);
            }

            return articles;
        }
    }
}
