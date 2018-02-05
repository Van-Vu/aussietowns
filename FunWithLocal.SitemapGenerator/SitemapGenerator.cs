// https://github.com/dncuug/X.Web.Sitemap

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.SitemapGenerator
{
    public interface ISitemapGenerator
    {
        void Run();
    }

    public class SitemapGenerator: ISitemapGenerator
    {
        private readonly ILogger<SitemapGenerator> _logger;
        private readonly IUrlRetriever _urlRetriever;
        private readonly ISerializedXmlSaver<Sitemap> _serializedXmlSaver;
        private readonly IConfiguration _configuration;
        public const int MaxNumberOfUrlsPerSitemap = 50000;


        public SitemapGenerator(ILogger<SitemapGenerator> logger, IUrlRetriever urlRetriever, 
            ISerializedXmlSaver<Sitemap> serializedXmlSaver, IConfiguration configuration)
        {
            _logger = logger;
            _urlRetriever = urlRetriever;
            _serializedXmlSaver = serializedXmlSaver;
            _configuration = configuration;
        }

        public void Run()
        {
            var listingContents = _urlRetriever.GetListingUrls();

            var webRootUrl = _configuration.GetSection("ApplicationConfiguration:WebRoot").Value;

            var allUrls = listingContents.ToList().Select(content => new Url
            {
                Location = $"{webRootUrl}/listing/{GenerateUrl(content.Header,content.Id)}",
                ChangeFrequency = ChangeFrequency.Weekly,
                TimeStamp = DateTime.UtcNow,
                Priority = .9
            }).ToList();

            var articleContents = _urlRetriever.GetArticleUrls();
            var articleUrls = articleContents.Select(content => new Url
            {
                Location = $"{webRootUrl}/article/{GenerateUrl(content.Header, content.Id)}",
                ChangeFrequency = ChangeFrequency.Weekly,
                TimeStamp = DateTime.UtcNow,
                Priority = .7
            }).ToList();

            allUrls.AddRange(articleUrls);

            var targetSitemapDirectory = new DirectoryInfo(_configuration.GetSection("ApplicationConfiguration:SitemapFolder").Value);

            GenerateSitemaps(allUrls, targetSitemapDirectory);
            _logger.LogInformation($"Sitemap generated in {targetSitemapDirectory} at {DateTime.Now}");
        }

        private string GenerateUrl(string header, int id)
        {
            // https://stackoverflow.com/questions/27041684/remove-special-characters-from-a-string-except-whitespace?rq=1
            var sanitizedHeader = Regex.Replace(header.ToLower(), @"[ ](?=[ ])|[^A-Za-z0-9 ]+", "").Trim();

            var url = string.Join("-", sanitizedHeader.Substring(0, Math.Min(header.Length, 55)).Split(' '));

            return $"{url}-{id}";
        }

        public void GenerateSitemaps(List<Url> urls, DirectoryInfo targetDirectory, string sitemapBaseFileNameWithoutExtension = "sitemap")
        {
            var sitemap = new Sitemap();
            sitemap.AddRange(urls);

            SaveSitemaps(targetDirectory, sitemapBaseFileNameWithoutExtension, sitemap);
        }

        private void SaveSitemaps(DirectoryInfo targetDirectory, string sitemapBaseFileNameWithoutExtension, Sitemap sitemap)
        {
            var fileName = $"{sitemapBaseFileNameWithoutExtension}.xml";
            _serializedXmlSaver.SerializeAndSave(sitemap, targetDirectory, fileName);
        }
    }
}
