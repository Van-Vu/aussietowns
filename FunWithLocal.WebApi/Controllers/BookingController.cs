using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Services;
using FunWithLocal.WebApi.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class BookingController: Controller
    {
        private readonly ILogger<ListingController> _logger;
        private readonly IBookingService _bookingService;
        private readonly IListingService _listingService;
        private readonly IEmailService _emailService;

        public BookingController(ILogger<ListingController> logger, IBookingService bookingService, IListingService listingService, IEmailService emailService)
        {
            _logger = logger;
            _listingService = listingService;
            _emailService = emailService;
            _bookingService = bookingService;
        }

        [HttpGet("{bookingId}")]
        public async Task<BookingResponse> GetBooking(int bookingId)
        {
            try
            {
                return await _bookingService.GetBooking(bookingId);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("listing/{listingId}")]
        public async Task<IEnumerable<BookingResponse>> GetAllBookingsByDate(int listingId, [FromBody] BookingRequest bookingRequest)
        {
            try
            {
                return await _bookingService.GetAllBookingsByDate(listingId, bookingRequest.BookingDate, bookingRequest.Time);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost]
        public async Task<int> ConfirmBooking([FromBody] BookingRequest request)
        {
            try
            {
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (request == null || !request.Participants.Any()) throw new ArgumentNullException(nameof(request));

                //var jsonBookingRequest = JsonConvert.SerializeObject(request);

                var bookingId = await _bookingService.ConfirmBooking(request);

                var listingDetail = _listingService.GetListingViewById(request.ListingId).Result;

                var bookingParticipants = request.Participants.Select(item => new BookingParticipant
                {
                    Fullname = $"{item.FirstName} {item.LastName}",
                    DateOfBirth = item.Birthday.ToString(),
                    Email = item.Email,
                    Phone = item.Phone
                }).ToList();

                var listingUrl = $"{Request.Headers["Access-Control-Allow-Origin"]}/listing/{StringHelper.SeorizeListingName(listingDetail.Header, listingDetail.Id)}";
                var bookingUrl = $"{Request.Headers["Access-Control-Allow-Origin"]}/booking/{string.Join("-", listingDetail.Header.Split(' '))}-{bookingId}";
                var manageBookingUrl = $"{Request.Headers["Access-Control-Allow-Origin"]}/booking/manage/{StringHelper.SeorizeListingName(listingDetail.Header, listingDetail.Id)}"; ;

                var bookingEmailViewModel = new BookingEmailViewModel
                {
                    ListingId = listingDetail.Id,
                    ListingUrl = listingUrl,
                    BookingUrl = bookingUrl,
                    ManageBookingUrl = manageBookingUrl,
                    ListingHeader = listingDetail.Header,
                    ListingDescription = listingDetail.Description,
                    BookingDate = request.BookingDate.ToString("dddd dd-MMM-yyyy", CultureInfo.DefaultThreadCurrentUICulture),
                    BookingTime = request.Time.ToString(@"hh\:mm", CultureInfo.DefaultThreadCurrentUICulture),
                    BookingParticipants = bookingParticipants
                };

                return await _emailService.SendBookingConfirmEmail(bookingEmailViewModel, listingDetail.OwnerEmail, listingDetail.OwnerEmail);

                //return ;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{bookingId}/update")]
        public async Task<int> UpdateBooking(int bookingId, [FromBody] BookingRequest request)
        {
            try
            {
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (request == null || !request.Participants.Any()) throw new ArgumentNullException(nameof(request));

                await _bookingService.UpdateBooking(bookingId, request);

                var listingDetail = _listingService.GetListingViewById(request.ListingId).Result;

                var bookingParticipants = request.Participants.Select(item => new BookingParticipant
                {
                    Fullname = $"{item.FirstName} {item.LastName}",
                    DateOfBirth = item.Birthday.ToString(),
                    Email = item.Email,
                    Phone = item.Phone
                }).ToList();

                var bookingEmailViewModel = new BookingEmailViewModel
                {
                    ListingId = listingDetail.Id,
                    ListingUrl = StringHelper.SeorizeListingName(listingDetail.Header, listingDetail.Id),
                    ListingHeader = listingDetail.Header,
                    ListingDescription = listingDetail.Description,
                    BookingDate = request.BookingDate.ToString("dddd dd-MMM-yyyy", CultureInfo.DefaultThreadCurrentUICulture),
                    BookingTime = request.Time.ToString(@"hh\:mm", CultureInfo.DefaultThreadCurrentUICulture),
                    BookingParticipants = bookingParticipants
                };

                return await _emailService.SendBookingConfirmEmail(bookingEmailViewModel, listingDetail.OwnerEmail, listingDetail.OwnerEmail);

                //return ;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{bookingId}/withdraw")]
        public async Task<int> WithdrawBooking(int bookingId)
        {
            try
            {
                await _bookingService.WithdrawBooking(bookingId);
                return 1;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
    }
}
