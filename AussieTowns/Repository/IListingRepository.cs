using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IListingRepository
    {
        Listing GetListingById(int listingId);
        IQueryable<Listing> GetListingByUserId(int userId);
        bool InsertListing(Listing listing);
        bool UpdateListing(Listing listing);
        bool DeleteListing(int listingId);
    }
}
