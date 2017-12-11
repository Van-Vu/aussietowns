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
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public class ImageService: IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IImageStorageService _imageStorageService;

        public ImageService(IImageRepository imageRepository, IImageStorageService imageStorageService)
        {
            _imageRepository = imageRepository;
            _imageStorageService = imageStorageService;
        }

        public async Task<Image> InsertListingImage(int listingId, IFormFile file)
        {
            var folderPath = $"listing/{listingId}";
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
            var folderPath = $"profile/{profileId}";
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
            var folderPath = $"profile/{profileId}";
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

            //return await _imageRepository.InsertHeroImage(profileId, url);
        }

        public async Task<Image> FetchImageByUrl(int listingId, string url)
        {
            return await _imageRepository.GetImageByUrl(listingId, url);
        }

        public async Task<int> DeleteImage(int imageId)
        {
            return await _imageRepository.DeleteImage(imageId);
        }

    }
}
