using System;
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
        Task<Listing> GetListingDetail(int id);
        Task<int> InsertListing(Listing listing);
        Task<int> UpdateListing(Listing listing);
        Task<int> DeActivateListing(int id);
    }
}
