using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient.Memcached;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Services
{
    public class ImageCloudinaryService: IImageStorageService
    {
        private readonly AppSettings _appSettings;
        private readonly Cloudinary _cloudinary;

        public ImageCloudinaryService(IOptions<AppSettings> appSettings)
        {
            //"dbncss4uz","755678623562733","sI8Sk2eyDL5odFEEO4XUOhxVAMM"
            _appSettings = appSettings.Value;

            var myAccount = new Account { ApiKey = "755678623562733", ApiSecret = "sI8Sk2eyDL5odFEEO4XUOhxVAMM", Cloud = "dbncss4uz" };
            _cloudinary = new Cloudinary(myAccount);
        }

        public async Task<ImageUploadResult> UploadImage(IFormFile file,string folderPath)
        {
            if (file != null)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    Folder = folderPath
                    //Transformation = new Transformation().Width(200).Height(200).Crop("thumb").Gravity("face")
                };

                var uploadResult = _cloudinary.Upload(uploadParams);
                return uploadResult;
            }
            return null;
        }

        public async Task<DelResResult> DeleteImage(string publicId)
        {
            var delParams = new DelResParams { PublicIds = new List<string> { publicId }, Invalidate = true };
            return _cloudinary.DeleteResources(delParams);
        }

        public string GetCloudinaryImageUrl(ImageType imageType, string publicId, IDevice device = null)
        {
            if (string.IsNullOrEmpty(publicId)) return string.Empty;
            //In case of fb / gg profile picture
            if (publicId.StartsWith("http")) return publicId;

            Func<IDevice, ImageSettings, string> getImageSettingsFunc = (clientDevice, setting) =>
            {
                switch (clientDevice.Type)
                {
                    case DeviceType.Desktop:
                        return setting.Desktop;
                    case DeviceType.Tablet:
                        return setting.Tablet;
                    case DeviceType.Mobile:
                        return setting.Mobile;
                }
                return string.Empty;
            };

            if (device == null)
            {
                device = new Device {Type = DeviceType.Desktop};
            }

            string imageSetting;
            switch (imageType)
            {
                case ImageType.Listing:
                    imageSetting = getImageSettingsFunc(device, _appSettings.CloudinarySettings.Listing);
                    break;
                case ImageType.UserProfile:
                    imageSetting = getImageSettingsFunc(device, _appSettings.CloudinarySettings.UserProfile);
                    break;
                case ImageType.UserHeroImage:
                    imageSetting = getImageSettingsFunc(device, _appSettings.CloudinarySettings.UserHeroImage);
                    break;
                case ImageType.ListingCard:
                    imageSetting = getImageSettingsFunc(device, _appSettings.CloudinarySettings.ListingCard);
                    break;
                case ImageType.Article:
                    imageSetting = getImageSettingsFunc(device, _appSettings.CloudinarySettings.Article);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(imageType), imageType, null);
            }

            return $"{_appSettings.CloudinarySettings.BaseUrl}{imageSetting}/{publicId}";
        }

        public List<Image> TransformImageUrls(List<Image> images, ImageType imageType, IDevice device = null)
        {
            if (images == null) return null;

            foreach (var image in images)
            {
                image.Url = GetCloudinaryImageUrl(imageType, image.Url, device);
            }

            return images;
        }

        public string TransformImageUrls(string imageUrls, ImageType imageType, IDevice device = null)
        {
            if (string.IsNullOrEmpty(imageUrls)) return string.Empty;

            var urls = imageUrls.Split(";").Select(imageUrl => GetCloudinaryImageUrl(imageType, imageUrl, device)).ToList();

            return string.Join(";",urls);

        }
    }
}
