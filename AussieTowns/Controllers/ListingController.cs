using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class ListingController : Controller
    {
        private readonly IListingService _listingService;
        private readonly IMapper _mapper;
        private readonly ILogger<ListingController> _logger;
        private readonly AppSettings _appSettings;

        public ListingController(IListingService listingService, IMapper mapper, IOptions<AppSettings> appSettings, ILogger<ListingController> logger)
        {
            _listingService = listingService;
            _mapper = mapper;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        [HttpGet("{id}")]
        [HttpGet("summary/{id}")]
        public async Task<ListingSummary> GetListingDetail(int id)
        {
            try
            {
                if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));

                var listing = await _listingService.GetListingDetail(id);

                if (listing == null)
                {
                    _logger.LogInformation("Can't find listing with id: {id}", id);
                    throw new ArgumentOutOfRangeException(nameof(id), "Can't find listing");
                }

                if (Request.Path.Value.IndexOf("listingsummary", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                {
                    return _mapper.Map<Listing, ListingSummary>(listing);
                }

                return _mapper.Map<Listing, ListingSummary>(listing);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }

        [HttpPost]
        public async Task<int> InsertListing([FromBody] Listing listing)
        {
            try
            {
                if (listing == null) throw new ArgumentNullException(nameof(listing));

                var newId = await _listingService.InsertListing(listing);
                return newId;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<int> UpdateListing(int id,[FromBody] Listing listing)
        {
            try
            {
                if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (listing == null) throw new ArgumentNullException(nameof(listing));

                return await _listingService.UpdateListing(listing);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{id}/book")]
        public async Task<int> Book(int id, [FromBody] BookingRequest request)
        {
            try
            {
                if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (request == null || !request.Participants.Any()) throw new ArgumentNullException(nameof(request));

                var jsonBookingRequest = JsonConvert.SerializeObject(request);
                // Bodom hack: deal with this later
                var result = await jsonBookingRequest.PushToSqsAsync(AwsSqsExtensions.GetClient(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                    _appSettings.AwsS3Region), _appSettings.SqsUrl);

                return await _listingService.Booking(request);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<int> DeleteTourOffer(int id)
        {
            try
            {
                if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));

                return await _listingService.DeActivateListing(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{listingId}/deleteImage")]
        public async Task<int> DeleteImage(int listingId, string url)
        {
            try
            {
                if (listingId < 100000 || listingId > 1000000) throw new ValidationException(nameof(listingId));

                var image = await _listingService.FetchImageByUrl(listingId, url);

                if (image == null)
                {
                    _logger.LogInformation("Can't find image with listingId: {listingId}, url: {url}", listingId, url);
                    throw new ArgumentOutOfRangeException(nameof(listingId), "Can't find image");
                }

                var filename = image.Url.Split('/').LastOrDefault();

                // Bodom hack: deal with this later
                var result = await AwsS3Extensions.DeleteObjectS3Async(
                    AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                        _appSettings.AwsS3Region), "meetthelocal-development", $"images/listings/{listingId}/{filename}");



                return await _listingService.DeleteImage(image.ImageId);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet]
        public async Task<IEnumerable<ListingSummary>> GetToursByUserId([FromQuery] int userId)
        {
            try
            {
                if (userId < 10000) throw new ValidationException(nameof(userId));

                var listingsSummary = await _listingService.GetListingsByUserId(userId);

                return listingsSummary.Select(listing => _mapper.Map<Listing, ListingSummary>(listing));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("suburb/{suburbid}")]
        public async Task<IEnumerable<ListingSummary>> GetListingsBySuburb(int suburbId)
        {
            try
            {
                if (suburbId < 0) throw new ValidationException(nameof(suburbId));

                var listingsSummary = await _listingService.GetListingsBySuburb(suburbId);

                return listingsSummary.Select(x => _mapper.Map<ListingView, ListingSummary>(x));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
    }
}
