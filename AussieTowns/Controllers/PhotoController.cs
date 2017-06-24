using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class PhotoController
    {
        private IHostingEnvironment _environment;

        public PhotoController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("upload")]
        public async Task<int> Upload(ICollection<IFormFile> files)
        {
            var uploads = Path.Combine(_environment.WebRootPath, "uploads");
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    using (var fileStream = new FileStream(Path.Combine(uploads, file.FileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }
            return 1;
        }

        [HttpPost("upload2")]
        public async Task<JsonResult> UploadFile(IList<IFormFile> files)
        {
            
            return new JsonResult(new { state = 0, message = string.Empty });
        }
    }
}
