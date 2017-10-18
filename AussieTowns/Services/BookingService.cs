using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;

namespace AussieTowns.Services
{
    public class BookingService: IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IListingRepository _listingRepository;

        public BookingService(IBookingRepository bookingRepository, IListingRepository listingRepository)
        {
            _bookingRepository = bookingRepository;
            _listingRepository = listingRepository;
        }

        public async Task<BookingResponse> GetBooking(int bookingId)
        {
            var booking = await _bookingRepository.GetBooking(bookingId);
            booking.Listing = await _listingRepository.GetListingById(booking.ListingId);

            return booking;
        }
    }
}
