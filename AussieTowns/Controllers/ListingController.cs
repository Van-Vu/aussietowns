using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using AussieTowns.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailService _emailService;
        private readonly AppSettings _appSettings;
        private readonly IImageService _imageService;

        readonly IAuthorizationService _authorizationService;

        public ListingController(IListingService listingService, IMapper mapper, IOptions<AppSettings> appSettings,
            ILogger<ListingController> logger, IHttpContextAccessor httpContextAccessor, IEmailService emailService, IAuthorizationService authorizationService, IImageService imageService)
        {
            _listingService = listingService;
            _mapper = mapper;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _emailService = emailService;
            _authorizationService = authorizationService;
            _imageService = imageService;
            _appSettings = appSettings.Value;

        }

        [HttpGet("{id}")]
        [HttpGet("summary/{id}")]
        public async Task<ListingResponse> GetListingDetail(int id)
        {
            try
            {
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));

                var listing = await _listingService.GetListingDetail(id);

                if (listing == null)
                {
                    _logger.LogInformation("Can't find listing with id: {id}", id);
                    throw new ArgumentOutOfRangeException(nameof(id), "Can't find listing");
                }

                //if (Request.Path.Value.IndexOf("listingsummary", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                //{
                //    return _mapper.Map<Listing, ListingSummary>(listing);
                //}

                return _mapper.Map<Listing, ListingResponse>(listing);
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

                if (!await _authorizationService.AuthorizeAsync(User, listing, Operations.Create))
                    throw new UnauthorizedAccessException();

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
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (listing == null) throw new ArgumentNullException(nameof(listing));

                if (!await _authorizationService.AuthorizeAsync(User, listing, Operations.Update))
                    throw new UnauthorizedAccessException();

                listing.Description = StringHelper.StripHtml(listing.Description);
                listing.Header = StringHelper.StripHtml(listing.Header);
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
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (request == null || !request.Participants.Any()) throw new ArgumentNullException(nameof(request));

                var jsonBookingRequest = JsonConvert.SerializeObject(request);

                // Bodom hack: deal with this later
                //await ElasticEmailClient.Send("Booking confirm !", "bodom0911@gmail.com", "Van", "sender", "senderName",
                //    to: new List<string> { "cob911@gmail.com" }, bodyHtml: @"<b>This is confirmation email <i>italic</i></b>");

                await _listingService.Booking(request);

                var listingDetail = _listingService.GetListingViewById(request.ListingId).Result;

                var bookingParticipants = request.Participants.Select(item => new BookingParticipant
                {
                    Fullname = $"{item.FirstName} {item.LastName}", DateOfBirth = item.Birthday.ToString(), Email = item.Email, Phone = item.Phone
                }).ToList();

                var bookingEmailViewModel = new BookingEmailViewModel
                {
                    ListingUrl = "google.com.au",
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

        [HttpDelete("{id}")]
        public async Task<int> DeleteListing(int id)
        {
            try
            {
                if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));

                if (!await _authorizationService.AuthorizeAsync(User, new Listing {Id = id}, Operations.Delete))
                    throw new UnauthorizedAccessException();

                return await _listingService.DeActivateListing(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{listingId}/addImage")]
        public async Task<IEnumerable<Image>> AddImage(int listingId, ICollection<IFormFile> files)
        {
            try
            {
                //if (listingId < 100000 || listingId > 1000000) throw new ValidationException(nameof(listingId));
                var listing = await _listingService.GetListingDetail(listingId);

                if (listing == null)
                {
                    _logger.LogInformation("Can't find listing with id: {id}", listingId);
                    throw new ArgumentOutOfRangeException(nameof(listingId), "Can't find listing");
                }

                if (!await _authorizationService.AuthorizeAsync(User, listing, Operations.Update))
                    throw new UnauthorizedAccessException();

                var imageUrls = new List<Image>();
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        // Bodom hack: deal with this later
                        var result = await AwsS3Extensions.SaveToS3Async(
                            AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                                _appSettings.AwsS3Region),
                            file.OpenReadStream(), "meetthelocal-development", $"images/listings/{listingId}/{file.FileName}");

                        var imageUrl = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/images/listings/{listingId}/{file.FileName}";
                        await _imageService.InsertListingImage(listingId, imageUrl);

                        imageUrls.Add(new Image { Url = imageUrl });
                    }
                }

                return imageUrls;
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
                //if (listingId < 100000 || listingId > 1000000) throw new ValidationException(nameof(listingId));

                if (!await _authorizationService.AuthorizeAsync(User, new Listing {Id=listingId}, Operations.Update))
                    throw new UnauthorizedAccessException();

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

        [HttpGet("feature")]
        //[Authorize(Policy = "ListingPolicy")]
        public async Task<IEnumerable<ListingSummary>> GetFeatureListings(string adfadfasdf)
        {
            try
            {
                var listingsView = await _listingService.GetListingsBySuburb(139);

                var listingSummary = listingsView.Take(3).Select(x => _mapper.Map<ListingView, ListingSummary>(x));

                return listingSummary;
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
