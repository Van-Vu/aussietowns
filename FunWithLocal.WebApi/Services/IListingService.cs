using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface IListingService
    {
        Task<IEnumerable<Listing>> GetListingsByUserId(int userId);
        Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId);

        Task<IEnumerable<ListingView>> GetFeatureListings();
        Task<ListingView> GetListingViewById(int listingId);
        Task<Listing> GetListingDetail(int id);
        Task<int> InsertListing(Listing listing);
        Task<int> UpdateListing(Listing listing);
        Task<int> DeActivateListing(int id);
        Task<int> DeleteListing(int id);
        Task<IEnumerable<int>> MapListingHeaderToId(string header);
    }
}
