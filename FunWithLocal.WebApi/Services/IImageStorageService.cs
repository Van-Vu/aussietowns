using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.Http;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public interface IImageStorageService
    {
        string GetCloudinaryImageUrl(ImageType imageType, string publicId, IDevice device = null);
        List<Image> TransformImageUrls(List<Image> images, ImageType imageType, IDevice device = null);
        string TransformImageUrls(string imageUrls, ImageType imageType, IDevice device = null);
        Task<ImageUploadResult> UploadImage(IFormFile file, string folderPath);
        Task<DelResResult> DeleteImage(string publicId);
    }
}
