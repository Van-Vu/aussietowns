using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Repository;

namespace AussieTowns.Services
{
    public class ImageService: IImageService
    {
        private readonly IImageRepository _imageRepository;
        public ImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        public async Task<int> InsertListingImage(int listingId, string url)
        {
            return await _imageRepository.InsertListingImage(listingId, url);
        }

        public async Task<int> InsertProfileImage(int profileId, string url)
        {
            return await _imageRepository.InsertProfileImage(profileId, url);
        }
    }
}
