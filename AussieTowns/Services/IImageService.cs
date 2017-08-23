using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Services
{
    public interface IImageService
    {
        Task<int> InsertListingImage(int listingId, string url);
        Task<int> InsertProfileImage(int profileId, string url);
    }
}
