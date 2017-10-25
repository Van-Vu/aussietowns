using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using AutoMapper;

namespace AussieTowns.Services
{
    public class BookingService: IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IListingRepository _listingRepository;
        private readonly IMapper _mapper;

        public BookingService(IBookingRepository bookingRepository, IListingRepository listingRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _listingRepository = listingRepository;
            _mapper = mapper;
        }

        public async Task<BookingResponse> GetBooking(int bookingId)
        {
            var booking = await _bookingRepository.GetBooking(bookingId);
            booking.Listing = _mapper.Map<Listing, ListingResponse>(await _listingRepository.GetListingById(booking.ListingId));

            return booking;
        }

        public async Task<IEnumerable<BookingResponse>> GetAllBookingsByDate(int listingId, DateTime bookingDate, TimeSpan startTime)
        {
            return await _bookingRepository.GetAllBookingsByDate(listingId, bookingDate, startTime);
        }

        public async Task<IEnumerable<BookingSlot>> GetBookingSlotsByListingId(int listingId)
        {
            return await _bookingRepository.GetBookingSlotsByListingId(listingId);
        }
        public async Task<int> ConfirmBooking(BookingRequest bookingRequest)
        {
            var tourGuests = bookingRequest.Participants.Select(participant => new TourGuest()
            {
                ExistingUserId = participant.Id,
                FirstName = participant.FirstName,
                LastName = participant.LastName,
                Email = participant.Email,
                Phone = participant.Phone,
                Address = participant.Address,
                EmergencyContact = participant.EmergencyContact
            }).ToList();

            var firstOrDefault = tourGuests.FirstOrDefault();
            if (firstOrDefault != null) firstOrDefault.IsPrimary = true;

            var booking = new Booking
            {
                ListingId = bookingRequest.ListingId,
                BookingDate = bookingRequest.BookingDate,
                StartTime = bookingRequest.Time,
            };
            
            return await _bookingRepository.ConfirmBooking(booking, tourGuests);
        }

        public async Task<int> UpdateBooking(int bookingId, BookingRequest bookingRequest)
        {
            return await _bookingRepository.UpdateBooking(bookingId, bookingRequest.Participants);
        }

        public async Task<int> WithdrawBooking(int bookingId)
        {
            return await _bookingRepository.WithdrawBooking(bookingId);
        }
    }
}
