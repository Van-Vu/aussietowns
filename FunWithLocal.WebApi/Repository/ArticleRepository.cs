using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Repository;
using Dapper;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Repository
{
    public class ArticleRepository: RepositoryBase, IArticleRepository
    {
        private readonly ILogger<ArticleRepository> _logger;

        public ArticleRepository(string connString, ILogger<ArticleRepository> logger) : base(connString)
        {
            _logger = logger;
        }

        public async Task<Article> GetArticle(int articleId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM article a INNER JOIN user u ON u.id = a.authorid WHERE a.id = @articleId;";

                dbConnection.Open();
                return (await dbConnection.QueryAsync<Article, User, Article>(sql, (article, user) =>
                {
                    article.Author = user;
                    return article;
                }, new { articleId })).FirstOrDefault();
            }
        }

        public async Task<int> InsertArticle(Article article)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var sql = "INSERT INTO Article(category, status, authorId, title, content, imageUrl, tags, createdDate, updatedDate) "
                                + "VALUES(@category, @status, @authorId, @title, @content, @imageUrl, @tags, @createdDate,@updatedDate);";
                        article.CreatedDate = DateTime.Now;
                        article.UpdatedDate = DateTime.Now;
                        await dbConnection.ExecuteAsync(sql, article);

                        var articleId = Convert.ToInt16(await dbConnection.ExecuteScalarAsync("SELECT LAST_INSERT_ID()"));

                        tran.Commit();
                        return articleId;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        _logger.LogCritical(e.Message, e);
                        throw;
                    }
                }
            }
        }
        public async Task<int> UpdateArticle(Article article)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var sql = "UPDATE Article SET category = @category, status = @status, title = @title, content = @content, imageUrl = @imageUrl, "
                                  + "tags = @tags, updatedDate=@updatedDate WHERE Id = @id";
                        article.UpdatedDate = DateTime.Now;
                        var updatedRow = await dbConnection.ExecuteAsync(sql, article);

                        tran.Commit();
                        return updatedRow;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        _logger.LogCritical(e.Message, e);
                        throw;
                    }
                }
            }
        }

        public async Task<int> UpdateStatus(int articleId, ArticleStatus status)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                using (var tran = dbConnection.BeginTransaction())
                {
                    try
                    {
                        var updateTasks = new List<Task<int>>();

                        var sql = "UPDATE Article SET status = @status, updatedDate=@updatedDate WHERE Id = @id";
                        updateTasks.Add(dbConnection.ExecuteAsync(sql, new {id= articleId, status, updatedDate = DateTime.Now  }));

                        await Task.WhenAll(updateTasks);

                        //Bodom
                        tran.Commit();
                        return 1;
                    }
                    catch (Exception e)
                    {
                        tran.Rollback();
                        _logger.LogCritical(e.Message, e);
                        throw;
                    }
                }
            }
        }

        public async Task<IEnumerable<Article>> GetFeatureArticles()
        {
            using (IDbConnection dbConnection = Connection)
            {
                var sql = "SELECT * FROM article a INNER JOIN user u ON u.id = a.authorid WHERE a.isFeatured = 1;";

                dbConnection.Open();
                return await dbConnection.QueryAsync<Article, User, Article>(sql, (article, user) =>
                {
                    article.Author = user;
                    return article;
                });
            }
        }
    }
}
