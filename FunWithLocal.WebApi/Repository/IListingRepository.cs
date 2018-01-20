using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface IListingRepository
    {
        Task<Listing> GetListingById(int listingId);
        Task<ListingView> GetListingViewById(int listingId);
        Task<IEnumerable<Listing>> GetListingByUserId(int userId);
        Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId);
        Task<int> InsertListing(Listing listing);
        Task<int> UpdateListing(Listing listing);
        Task<int> DeActivateListing(int listingId);
        Task<int> DeleteListing(int listingId);
        Task<IEnumerable<int>> GetListingIdByHeader(string header);

        Task<IEnumerable<ListingView>> GetFeatureListings();
    }
}
