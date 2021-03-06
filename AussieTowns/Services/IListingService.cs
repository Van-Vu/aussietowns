﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IListingService
    {
        Task<IEnumerable<Listing>> GetListingsByUserId(int userId);
        Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId);
        Task<ListingView> GetListingViewById(int listingId);
        Task<Listing> GetListingDetail(int id);
        Task<int> InsertListing(Listing listing);
        Task<int> UpdateListing(Listing listing);
        Task<int> DeActivateListing(int id);
        Task<Image> FetchImageByUrl(int listingId, string url);
        Task<IEnumerable<int>> MapListingHeaderToId(string header);
        Task<int> DeleteImage(int imageId);
    }
}
