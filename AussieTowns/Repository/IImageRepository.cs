﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AussieTowns.Repository
{
    public interface IImageRepository
    {
        Task<int> InsertListingImage(int listingId, string url);
        Task<int> InsertProfileImage(int profileId, string url);
        Task<int> InsertHeroImage(int profileId, string url);
    }
}
