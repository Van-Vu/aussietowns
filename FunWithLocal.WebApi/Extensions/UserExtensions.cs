using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Extensions
{
    public static class UserExtensions
    {
        public static void TransformImageUrls(this User user, IImageStorageService imageStorageService, IDevice device)
        {
            if (user.OperatorListings != null)
            {
                foreach (var listing in user.OperatorListings)
                {
                    listing.ImageUrls = imageStorageService.TransformImageUrls(listing.ImageUrls, ImageType.ListingCard,device);
                }
            }

            if (user.GuestListings != null)
            {
                foreach (var listing in user.GuestListings)
                {
                    listing.ImageUrls = imageStorageService.TransformImageUrls(listing.ImageUrls, ImageType.ListingCard, device);
                }
            }
        }
    }
}
