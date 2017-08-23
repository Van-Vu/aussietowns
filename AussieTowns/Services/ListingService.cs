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

        public async Task<int> DeleteImage(int imageId)
        {
            return await _listingRepository.DeleteImage(imageId);
        }

        public async Task<int> Booking(BookingRequest bookingRequest)
        {
            var bookings = bookingRequest.Participants.Select(participant => new Booking
            {
                ListingId = bookingRequest.ListingId,
                BookingDate = bookingRequest.BookingDate,
                Time = bookingRequest.Time,
                ExistingUserId = participant.Id,
                FirstName = participant.FirstName,
                LastName = participant.LastName,
                Email = participant.Email,
                Phone = participant.Phone,
                Address = participant.Address,
                EmergencyContact = participant.EmergencyContact
            }).ToList();

            bookings.FirstOrDefault().IsPrimary = true;
            return await _listingRepository.AddTourGuest(bookings);
        }
    }
}
