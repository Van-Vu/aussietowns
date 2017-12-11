﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;

namespace FunWithLocal.WebApi.Services
{
    public class ListingService: IListingService
    {
        private readonly IListingRepository _listingRepository;

        public ListingService(IListingRepository listingRepository)
        {
            _listingRepository = listingRepository;
        }

        public async Task<IEnumerable<Listing>> GetListingsByUserId(int userId)
        {
            return await _listingRepository.GetListingByUserId(userId);
        }

        public async Task<Listing> GetListingDetail(int id)
        {
            return await _listingRepository.GetListingById(id);
        }

        public async Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId)
        {
            return await _listingRepository.GetListingsBySuburb(suburbId);
        }

        public async Task<ListingView> GetListingViewById(int listingId)
        {
            return await _listingRepository.GetListingViewById(listingId);
        }

        public async Task<int> InsertListing(Listing listing)
        {
            return await _listingRepository.InsertListing(listing);
        }

        public async Task<int> UpdateListing(Listing listing)
        {
            return await _listingRepository.UpdateListing(listing);
        }

        public async Task<int> DeActivateListing(int id)
        {
            return await _listingRepository.DeActivateListing(id);
        }

        public async Task<IEnumerable<int>> MapListingHeaderToId(string header)
        {
            return await _listingRepository.GetListingIdByHeader(header);
        }

        public async Task<IEnumerable<ListingView>> GetFeatureListings()
        {
            return await _listingRepository.GetFeatureListings();
        }
    }
}
