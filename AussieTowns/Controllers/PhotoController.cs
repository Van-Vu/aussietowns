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
using Microsoft.Extensions.Options;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class PhotoController
    {
        private IHostingEnvironment _environment;
        private readonly AppSettings _appSettings;
        private readonly IListingService _listingService;

        public PhotoController(IHostingEnvironment environment, IOptions<AppSettings> appSettings, IListingService listingService)
        {
            _environment = environment;
            _appSettings = appSettings.Value;
            _listingService = listingService;
        }

        [HttpPost("uploadListing/{id}")]
        public async Task<JsonResult> UploadListing(int id, ICollection<IFormFile> files)
        {
            try
            {
                var imageUrls = new List<Image>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var result = await AwsS3Extensions.SaveToS3Async(
                            AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                                _appSettings.AwsS3Region),
                            file.OpenReadStream(), "meetthelocal-development", $"images/listings/{id}/{file.FileName}" );

                        var imageUrl = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/images/listings/{id}/{file.FileName}";
                        await _listingService.InsertImage(id, imageUrl);

                        imageUrls.Add(new Image { Url = imageUrl });
                    }
                }

                // Bodom hack
                return new JsonResult(new { newImages = imageUrls });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
