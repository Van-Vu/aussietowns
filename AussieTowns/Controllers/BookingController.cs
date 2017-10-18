using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class BookingController: Controller
    {
        private readonly ILogger<ListingController> _logger;
        private readonly IBookingService _bookingService;

        public BookingController(ILogger<ListingController> logger, IBookingService bookingService)
        {
            _logger = logger;
            _bookingService = bookingService;
        }

        [HttpGet("{id}")]
        public async Task<BookingResponse> GetBooking(int id)
        {
            try
            {
                return await _bookingService.GetBooking(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
            
        }
    }
}
