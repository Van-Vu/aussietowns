using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.DataAccess;
using AussieTowns.Model;
using Microsoft.EntityFrameworkCore;

namespace AussieTowns.Repository
{
    public class ListingRepository: IListingRepository
    {
        private readonly AussieTownDBContext _context;

        public ListingRepository(AussieTownDBContext context)
        {
            _context = context;
        }

        public Listing GetListingById(int listingId)
        {
            return _context.Listings.AsNoTracking().SingleOrDefault(x => x.Id == listingId);
        }

        public IQueryable<Listing> GetListingByUserId(int userId)
        {
            return _context.Listings.AsNoTracking()
                    .Include(x=>x.TourOperators)
                    .Include(y=>y.TourGuests)
                    .Where(listing => listing.TourGuests.Any(guest => guest.UserId == userId) 
                            || listing.TourOperators.Any(host => host.UserId == userId));
        }

        public bool InsertListing(Listing listing)
        {
            try
            {
                _context.Listings.Add(listing);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public bool UpdateListing(Listing listing)
        {
            try
            {
                _context.DetachEntity<Listing>(listing.Id);

                _context.Entry(listing).State = EntityState.Modified;
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteListing(int listingId)
        {
            try
            {
                var listing = GetListingById(listingId);
                _context.Listings.Remove(listing);

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
