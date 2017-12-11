﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface IBookingRepository
    {
        Task<BookingResponse> GetBooking(int bookingId);

        Task<IEnumerable<BookingSlot>> GetBookingSlotsByListingId(int listingId);

        Task<IEnumerable<BookingResponse>> GetAllBookingsByDate(int listingId, DateTime bookingDate, TimeSpan startTime);
        Task<int> ConfirmBooking(Booking booking, IList<TourGuest> tourGuests);
        Task<int> UpdateBooking(int bookingId, IList<TourGuest> guests);
        Task<int> WithdrawBooking(int bookingId);
    }
}
