using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Model;
using AutoMapper;
using FunWithLocal.WebApi.Auth;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using FunWithLocal.WebApi.ViewModel;
using Ganss.XSS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Wangkanai.Detection;


namespace FunWithLocal.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController: Controller
    {
        private readonly ILogger<ArticleController> _logger;
        private readonly IArticleService _articleService;
        private readonly IAuthorizationService _authorizationService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IDevice _device;
        private readonly IImageStorageService _imageStorageService;

        public ArticleController(ILogger<ArticleController> logger, IArticleService articleService,
            IAuthorizationService authorizationService, IImageService imageService, IMapper mapper,
            IDeviceResolver deviceResolver, IImageStorageService imageStorageService)
        {
            _logger = logger;
            _articleService = articleService;
            _authorizationService = authorizationService;
            _imageService = imageService;
            _mapper = mapper;
            _device = deviceResolver.Device;
            _imageStorageService = imageStorageService;
        }

        [HttpGet("{articleId}")]
        public async Task<ArticleResponse> GetArticle(int articleId)
        {
            try
            {
                var article = await _articleService.GetArticle(articleId);

                if (article == null)
                {
                    _logger.LogInformation("Can't find article with id: {articleId}", articleId);
                    throw new ArgumentOutOfRangeException(nameof(articleId), "Can't find article");
                }

                return _mapper.Map<Article, ArticleResponse>(article, opts => opts.BeforeMap((x, y) =>
                {
                    x.ImageUrl = _imageStorageService.TransformImageUrls(x.ImageUrl, ImageType.Article, _device);
                }));

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("feature")]
        public async Task<IEnumerable<ArticleCard>> GetFeatureArticles()
        {
            try
            {
                var article = await _articleService.GetFeatureArticles(_device);
                return _mapper.Map<IEnumerable<Article>, IEnumerable<ArticleCard>>(article);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{articleId}")]
        [HtmlSanitizerActionFilter]
        public async Task<int> InsertOrUpdateArticle(int articleId, [FromBody] Article article)
        {
            try
            {
                if (article == null) throw new ArgumentNullException(nameof(article));

                if (!(await _authorizationService.AuthorizeAsync(User, article, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                if (articleId > 0)
                {
                    var existingArticle = await _articleService.GetArticle(articleId);

                    if (existingArticle == null)
                        throw new UnauthorizedAccessException();

                    return await _articleService.UpdateArticle(article);
                }
                else
                {
                    var userId = User.FindFirst(c => c.Type == "userId" && c.Issuer == TokenAuthOption.Issuer)?.Value;
                    article.AuthorId = Convert.ToInt32(userId);
                    var newId = await _articleService.InsertArticle(article);
                    return newId;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{articleId}/addImage")]
        public async Task<string> UploadImage(int articleId, IList<IFormFile> files)
        {
            try
            {
                var article = await _articleService.GetArticle(articleId);

                if (article == null)
                {
                    _logger.LogInformation("Can't find article with id: {articleId}", articleId);
                    throw new ArgumentOutOfRangeException(nameof(articleId), "Can't find article");
                }

                if (!(await _authorizationService.AuthorizeAsync(User, article, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                if (files == null || files.Count > 1) throw new ArgumentNullException(nameof(files));
                var file = files.FirstOrDefault();
                if (file != null && file.Length <= 0) throw new ArgumentNullException(nameof(file));

                var newImageUrl = await _imageService.InsertArticleImage(articleId, file);

                return !string.IsNullOrEmpty(newImageUrl) ? newImageUrl : string.Empty;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
    }
}
