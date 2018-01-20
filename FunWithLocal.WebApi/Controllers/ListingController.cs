using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Rest.Azure;
using Wangkanai.Detection;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FunWithLocal.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ListingController : Controller
    {
        private readonly IListingService _listingService;
        private readonly IBookingService _bookingService;
        private readonly IImageStorageService _imageStorageService;
        private readonly IMapper _mapper;
        private readonly ILogger<ListingController> _logger;
        private readonly AppSettings _appSettings;
        private readonly IImageService _imageService;
        private readonly IDevice _device;

        readonly IAuthorizationService _authorizationService;

        public ListingController(IListingService listingService, IMapper mapper, IOptions<AppSettings> appSettings,
            ILogger<ListingController> logger, IAuthorizationService authorizationService, IImageService imageService, IBookingService bookingService,
            IDeviceResolver deviceResolver, IImageStorageService imageStorageService) 
        {
            _listingService = listingService;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _imageService = imageService;
            _bookingService = bookingService;
            _imageStorageService = imageStorageService;
            _appSettings = appSettings.Value;
            _device = deviceResolver.Device;
        }

        [HttpGet("{id}")]
        [HttpGet("summary/{id}")]
        // Bodom: CSRF
        //[ValidateAntiForgeryToken]
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

                return _mapper.Map<Listing, ListingResponse>(listing,
                        opts => opts.BeforeMap((x, y) =>
                        {
                            x.ImageList = _imageStorageService.TransformImageUrls(x.ImageList, ImageType.Listing, _device);
                        }));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }

        [HttpGet("{id}/booking")]
        public async Task<ListingResponse> GetListingWithBookingDetail(int id)
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

                listing.BookingSlots = await _bookingService.GetBookingSlotsByListingId(id);

                return _mapper.Map<Listing, ListingResponse>(listing, opts => opts.BeforeMap((x, y) =>
                        {
                            x.ImageList = _imageStorageService.TransformImageUrls(x.ImageList, ImageType.Listing, _device);
                        }));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("feature")]
        //[Authorize(Policy = "ListingPolicy")]
        public async Task<IEnumerable<ListingSummary>> GetFeatureListings()
        {
            try
            {
                var listingsView = await _listingService.GetFeatureListings();

                var listingSummary = listingsView.Select(listing => _mapper.Map<ListingView, ListingSummary>(listing,
                    opts => opts.BeforeMap((x, y) =>
                    {
                        x.ImageUrls = _imageStorageService.TransformImageUrls(x.ImageUrls, ImageType.ListingCard, _device);
                    })));

                return listingSummary;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost]
        public async Task<int> InsertListing([FromBody] Listing listing)
        {
            try
            {
                if (listing == null) throw new ArgumentNullException(nameof(listing));

                if (!(await _authorizationService.AuthorizeAsync(User, listing, Operations.Create)).Succeeded)
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

        [HttpPost("{id}")]
        public async Task<int> UpdateListing(int id,[FromBody] Listing listing)
        {
            try
            {
                //if (id < 100000 || id > 1000000) throw new ValidationException(nameof(id));
                if (listing == null) throw new ArgumentNullException(nameof(listing));

                if (!(await _authorizationService.AuthorizeAsync(User, listing, Operations.Update)).Succeeded)
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

        [HttpPost("{id}/remove")]
        public async Task<int> DeactivateListing(int id)
        {
            try
            {
                if (id < 1 || id > 1000000) throw new ValidationException(nameof(id));

                if (!(await _authorizationService.AuthorizeAsync(User, new Listing { Id = id }, Operations.Delete)).Succeeded)
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

                if (!(await _authorizationService.AuthorizeAsync(User, listing, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                var imageUrls = new List<Image>();
                foreach (var file in files)
                {
                    if (file.Length <= 0) continue;

                    var newImage = await _imageService.InsertListingImage(listingId, file);

                    imageUrls.Add(newImage);
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
                var listing = await _listingService.GetListingDetail(listingId);

                if (listing == null)
                {
                    _logger.LogInformation("Can't find listing with id: {id}", listingId);
                    throw new ArgumentOutOfRangeException(nameof(listingId), "Can't find listing");
                }

                if (!(await _authorizationService.AuthorizeAsync(User, listing, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                var image = await _imageService.FetchListingImageByUrl(listingId, url);

                if (image == null)
                {
                    _logger.LogInformation("Can't find image with listingId: {listingId}, url: {url}", listingId, url);
                    throw new ArgumentOutOfRangeException(nameof(url), "Can't find image");
                }

                return await _imageService.DeleteImage(image.ImageId, image.Url);
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

                return listingsSummary.Select(listing => _mapper.Map<Listing, ListingSummary>(listing, 
                    opts => opts.BeforeMap((x, y) =>
                        {
                            x.ImageList = _imageStorageService.TransformImageUrls(x.ImageList, ImageType.Listing, _device);
                        })));
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

                return listingsSummary.Select(listing => _mapper.Map<ListingView, ListingSummary>(listing,
                                        opts => opts.BeforeMap((x, y) =>
                                        {
                                            x.ImageUrls = _imageStorageService.TransformImageUrls(x.ImageUrls, ImageType.Listing, _device);
                                        })));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
    }
}
