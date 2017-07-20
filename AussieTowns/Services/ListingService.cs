using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<Image> FetchImageByUrl(int listingId, string url)
        {
            return await _listingRepository.GetImageByUrl(listingId, url);
        }

        public async Task<int> InsertImage(int listingId, string url)
        {
            return await _listingRepository.InsertImage(listingId, url);
        }

        public async Task<int> DeleteImage(int imageId)
        {
            return await _listingRepository.DeleteImage(imageId);
        }

        public async Task<int> Booking(BookingRequest bookingRequest)
        {
            var bookings = new List<Booking>();
            foreach (var participant in bookingRequest.Participants)
            {
                bookings.Add(new Booking
                {
                    ListingId = bookingRequest.ListingId,
                    BookingDate = bookingRequest.BookingDate,
                    Time = bookingRequest.Time,
                    ExistingUserId = participant.Id,
                    FirstName = participant.Id == 0 ? participant.FirstName : string.Empty,
                    LastName = participant.Id == 0 ? participant.LastName : string.Empty,
                    Email = participant.Id == 0 ? participant.Email : string.Empty,
                    Phone = participant.Id == 0 ? participant.Phone : string.Empty,
                    Address = participant.Id == 0 ? participant.Address : string.Empty,
                    EmergencyContact = participant.Id == 0 ? participant.EmergencyContact : string.Empty
                });
            }

            if (bookings.Any())
            {
                bookings.FirstOrDefault().IsPrimary = true;
                return await _listingRepository.AddTourGuest(bookings);
            }
            
            throw new Exception("hey No Booking User");
        }
    }
}
