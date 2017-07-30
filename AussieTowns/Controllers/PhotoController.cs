using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class PhotoController
    {
        private readonly AppSettings _appSettings;
        private readonly IListingService _listingService;
        private readonly ILogger<PhotoController> _logger;

        public PhotoController(IOptions<AppSettings> appSettings, IListingService listingService, ILogger<PhotoController> logger)
        {
            _appSettings = appSettings.Value;
            _listingService = listingService;
            _logger = logger;
        }

        [HttpPost("uploadListing/{listingId}")]
        public async Task<IEnumerable<Image>> UploadListing(int listingId, ICollection<IFormFile> files)
        {
            try
            {
                if (listingId < 100000 || listingId > 1000000) throw new ArgumentOutOfRangeException(nameof(listingId));

                var imageUrls = new List<Image>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        // Bodom hack: deal with this later
                        var result = await AwsS3Extensions.SaveToS3Async(
                            AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                                _appSettings.AwsS3Region),
                            file.OpenReadStream(), "meetthelocal-development", $"images/listings/{listingId}/{file.FileName}" );

                        var imageUrl = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/images/listings/{listingId}/{file.FileName}";
                        await _listingService.InsertImage(listingId, imageUrl);

                        imageUrls.Add(new Image { Url = imageUrl });
                    }
                }

                return imageUrls;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("uploadProfile/{id}")]
        public async Task<JsonResult> UploadProfile(int id, IList<IFormFile> files)
        {
            
            return new JsonResult(new { state = 0, message = string.Empty });
        }
    }
}
