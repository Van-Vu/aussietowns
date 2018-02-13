using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AussieTowns.Repository;
using AussieTowns.Services;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public class ImageService: IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IImageStorageService _imageStorageService;
        private readonly string _environment;
        public ImageService(IImageRepository imageRepository, IImageStorageService imageStorageService, IOptions<AppSettings> appSettings)
        {
            _imageRepository = imageRepository;
            _imageStorageService = imageStorageService;

            var appSetting = appSettings.Value;
            _environment = appSetting.Environment == "prod" ? "prod" : "stage";
        }

        public async Task<Image> InsertListingImage(int listingId, IFormFile file)
        {
            var folderPath = $"{_environment}/listing/{listingId}";
            var cloudinaryResult = await _imageStorageService.UploadImage(file, folderPath);

            if (cloudinaryResult.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Can not upload listing image {file.FileName}: {cloudinaryResult.Error.Message}");

            var insertImage = await _imageRepository.InsertListingImage(listingId, cloudinaryResult.PublicId);

            if (insertImage == 1)
            {
                return new Image {Url = cloudinaryResult.SecureUri.OriginalString};
            }

            throw new Exception($"Can not upload listing image {file.FileName}: Database error");
        }

        public async Task<string> InsertProfileImage(int profileId, IFormFile file)
        {
            var folderPath = $"{_environment}/profile/{profileId}";
            var cloudinaryResult = await _imageStorageService.UploadImage(file, folderPath);

            if (cloudinaryResult.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Can not upload profile image {file.FileName}: {cloudinaryResult.Error.Message}");

            var insertImage = await _imageRepository.InsertProfileImage(profileId, cloudinaryResult.PublicId);

            // Insert: 1, Update: 2
            if (insertImage < 3)
            {
                return cloudinaryResult.SecureUri.OriginalString;
            }

            throw new Exception($"Can not upload profile image {file.FileName}: Database error");

            //return await _imageRepository.InsertProfileImage(profileId, url);
        }

        public async Task<string> InsertHeroImage(int profileId, IFormFile file)
        {
            var folderPath = $"{_environment}/profile/{profileId}";
            var cloudinaryResult = await _imageStorageService.UploadImage(file, folderPath);

            if (cloudinaryResult.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Can not upload hero image {file.FileName}: {cloudinaryResult.Error.Message}");

            var insertImage = await _imageRepository.InsertHeroImage(profileId, cloudinaryResult.PublicId);

            // Insert: 1, Update: 2
            if (insertImage < 3)
            {
                return cloudinaryResult.SecureUri.OriginalString;
            }

            throw new Exception($"Can not upload hero image {file.FileName}: Database error");
        }

        public async Task<string> InsertArticleImage(int articleId, IFormFile file)
        {
            var folderPath = $"{_environment}/article/{articleId}";
            var cloudinaryResult = await _imageStorageService.UploadImage(file, folderPath);

            if (cloudinaryResult.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Can not upload article image {file.FileName}: {cloudinaryResult.Error.Message}");

            var insertImage = await _imageRepository.InsertArticleImage(articleId, cloudinaryResult.PublicId);

            if (insertImage < 2)
            {
                return cloudinaryResult.SecureUri.OriginalString;
            }

            throw new Exception($"Can not upload hero image {file.FileName}: Database error");
        }

        public async Task<Image> FetchListingImageByUrl(int listingId, string url)
        {
            return await _imageRepository.GetListingImageByUrl(listingId, url);
        }

        public async Task<int> DeleteImage(int imageId, string url)
        {
            var cloudinaryResult = await _imageStorageService.DeleteImage(url);

            if (cloudinaryResult.StatusCode != HttpStatusCode.OK)
                throw new Exception($"Can not upload listing image {url}: {cloudinaryResult.Error.Message}");


            return await _imageRepository.DeleteImage(imageId);
        }
    }
}
