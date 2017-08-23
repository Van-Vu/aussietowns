using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IListingRepository
    {
        Task<Listing> GetListingById(int listingId);
        Task<IEnumerable<Listing>> GetListingByUserId(int userId);
        Task<IEnumerable<ListingView>> GetListingsBySuburb(int suburbId);
        Task<int> InsertListing(Listing listing);
        Task<int> UpdateListing(Listing listing);
        Task<int> DeActivateListing(int listingId);

        Task<int> AddTourGuest(IList<Booking> bookings);

        Task<Image> GetImageByUrl(int listingId, string url);
        Task<IEnumerable<int>> GetListingIdByHeader(string header);
        Task<int> DeleteImage(int imageId);
    }
}
