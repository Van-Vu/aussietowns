using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.SitemapLib;
using Microsoft.AspNetCore.Mvc;

namespace FunWithLocal.WebApi.Controllers
{
    [Route("[controller]")]
    public class SitemapController
    {
        private readonly ISitemapLib _sitemapLib;

        public SitemapController(ISitemapLib sitemapLib)
        {
            _sitemapLib = sitemapLib;
        }

        [HttpGet("generate")]
        public async Task<string> GenerateSitemap()
        {
            try
            {
                return await _sitemapLib.Run();
            }
            catch (Exception e)
            {
                throw new Exception($"Something is wrong: {e.Message}",e);
            }
        }
    }
}
