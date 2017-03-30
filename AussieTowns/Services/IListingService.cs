using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IListingService
    {
        IEnumerable<Listing> GetListingsByUserId(int userId);
        Listing GetListingDetail(int id);
        bool InsertListing(Listing listing);
        bool UpdateListing(Listing listing);
        bool DeleteListing(int id);
    }
}
