using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Extensions;
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

        public PhotoController(IHostingEnvironment environment, IOptions<AppSettings> appSettings)
        {
            _environment = environment;
            _appSettings = appSettings.Value;
        }

        [HttpPost("upload")]
        public async Task<JsonResult> Upload(ICollection<IFormFile> files)
        {
            try
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var result = await AwsS3Extensions.SaveToS3Async(
                            AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                                _appSettings.AwsS3Region),
                            file.OpenReadStream(), "meetthelocal-development", $"images/{file.FileName}" );
                    }
                }

                // Bodom hack
                return new JsonResult(new { state = 0, url = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/{files.FirstOrDefault().FileName}" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost("upload2")]
        public async Task<JsonResult> UploadFile(IList<IFormFile> files)
        {
            
            return new JsonResult(new { state = 0, message = string.Empty });
        }
    }
}
