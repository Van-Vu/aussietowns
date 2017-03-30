using System;
using System.Collections.Generic;
using AussieTowns.Model;
using AussieTowns.Repository;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;

namespace AussieTowns.Services
{
    public class ListingService: IListingService
    {
        private readonly IListingRepository _listingRepository;

        public ListingService(IListingRepository listingRepository)
        {
            _listingRepository = listingRepository;
        }

        public IEnumerable<Listing> GetListingsByUserId(int userId)
        {
            return _listingRepository.GetListingByUserId(userId);
        }

        public Listing GetListingDetail(int id)
        {
            return _listingRepository.GetListingById(id);
        }

        public bool InsertListing(Listing listing)
        {
            return _listingRepository.InsertListing(listing);
        }

        public bool UpdateListing(Listing listing)
        {
            return _listingRepository.UpdateListing(listing);
        }

        public bool DeleteListing(int id)
        {
            return _listingRepository.DeleteListing(id);
        }
    }
}
