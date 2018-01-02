﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface IArticleService
    {
        Task<Article> GetArticle(int articleId);

        Task<IEnumerable<Article>> GetFeatureArticles();
        Task<int> InsertArticle(Article article);
        Task<int> UpdateArticle(Article article);
        Task<int> UpdateStatus(int articleId, ArticleStatus status);
    }
}