// https://github.com/dncuug/X.Web.Sitemap

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.SitemapLib
{
    public interface ISitemapLib
    {
        Task<string> Run();
    }

    public class SitemapLib: ISitemapLib
    {
        private readonly ILogger<SitemapLib> _logger;
        private readonly IUrlRetriever _urlRetriever;
        private readonly ISerializedXmlSaver<Sitemap> _serializedXmlSaver;
        private readonly IConfiguration _configuration;
        public const int MaxNumberOfUrlsPerSitemap = 50000;
        private readonly string _cloudinaryBaseUrl;


        public SitemapLib(ILogger<SitemapLib> logger, IUrlRetriever urlRetriever, 
            ISerializedXmlSaver<Sitemap> serializedXmlSaver, IConfiguration configuration)
        {
            _logger = logger;
            _urlRetriever = urlRetriever;
            _serializedXmlSaver = serializedXmlSaver;
            _configuration = configuration;

            _cloudinaryBaseUrl = _configuration.GetSection("FwlSettings:CloudinarySettings:BaseUrl").Value;
        }

        public async Task<string> Run()
        {
            var listingContents = await _urlRetriever.GetListingUrls();

            var webRootUrl = _configuration.GetSection("FwlSettings:WebRoot").Value;

            var allUrls = listingContents.ToList().Select(content => new Url
            {
                Location = $"{webRootUrl}/listing/{GenerateSeoUrl(content.Header,content.Id)}",
                ChangeFrequency = ChangeFrequency.Daily,
                Image = string.IsNullOrEmpty(content.Url) ? null : new Image { Url = GenerateImageUrl(content.Url) },
                TimeStamp = DateTime.UtcNow,
                Priority = .9
            }).ToList();

            var articleContents = await _urlRetriever.GetArticleUrls();
            var articleUrls = articleContents.Select(content => new Url
            {
                Location = $"{webRootUrl}/article/{GenerateSeoUrl(content.Header, content.Id)}",
                ChangeFrequency = ChangeFrequency.Daily,
                Image = string.IsNullOrEmpty(content.Url) ? null : new Image { Url = GenerateImageUrl(content.Url) },
                TimeStamp = DateTime.UtcNow,
                Priority = .7
            }).ToList();

            allUrls.AddRange(articleUrls);

            var targetSitemapDirectory = new DirectoryInfo(_configuration.GetSection("FwlSettings:SitemapFolder").Value);

            GenerateSitemaps(allUrls, targetSitemapDirectory);
            _logger.LogInformation($"Sitemap generated in {targetSitemapDirectory} at {DateTime.Now}");

            return $"Sitemap generated in {targetSitemapDirectory} at {DateTime.Now}";
        }

        private string GenerateSeoUrl(string header, int id)
        {
            // https://stackoverflow.com/questions/27041684/remove-special-characters-from-a-string-except-whitespace?rq=1
            var sanitizedHeader = Regex.Replace(header.ToLower(), @"[ ](?=[ ])|[^A-Za-z0-9 ]+", "").Trim();

            var url = string.Join("-", sanitizedHeader.Substring(0, Math.Min(sanitizedHeader.Length, 55)).Split(' ')).TrimEnd('-');

            return $"{url}-{id}";
        }

        private string GenerateImageUrl(string url)
        {
            if (url.StartsWith("http")) return url;

            return $"{_cloudinaryBaseUrl}{url}";
        }

        public void GenerateSitemaps(List<Url> urls, DirectoryInfo targetDirectory, string sitemapBaseFileNameWithoutExtension = "sitemap")
        {
            var sitemap = new Sitemap {Urls = urls};

            SaveSitemaps(targetDirectory, sitemapBaseFileNameWithoutExtension, sitemap);
        }

        private void SaveSitemaps(DirectoryInfo targetDirectory, string sitemapBaseFileNameWithoutExtension, Sitemap sitemap)
        {
            var fileName = $"{sitemapBaseFileNameWithoutExtension}.xml";
            _serializedXmlSaver.SerializeAndSave(sitemap, targetDirectory, fileName);
        }
    }
}
