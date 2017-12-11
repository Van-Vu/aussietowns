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
        string GetCloudinaryImageUrl(ImageType imageType, IDevice device, string publicId);
        List<Image> TransformImageUrls(List<Image> images, ImageType imageType, IDevice device);
        string TransformImageUrls(string imageUrls, ImageType imageType, IDevice device);
        Task<ImageUploadResult> UploadImage(IFormFile file, string folderPath);
        Task<DelResResult> DeleteResource(string publicId);
    }
}
