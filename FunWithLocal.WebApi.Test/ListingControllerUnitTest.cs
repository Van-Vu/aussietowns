using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using FunWithLocal.WebApi.Controllers;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Wangkanai.Detection;
using Xunit;
using System.Linq;
using System.Security.Claims;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace FunWithLocal.WebApi.Test
{
    public class ListingControllerUnitTest
    {
        private readonly Mock<IListingService> _listingServiceMock;
        private readonly IMapper _mapperMock;
        private readonly Mock<IOptions<AppSettings>> _appSettingMock;
        private readonly Mock<ILogger<ListingController>> _loggerMock;
        private readonly Mock<IAuthorizationService> _authorizationServiceMock;
        private readonly Mock<IImageService> _imageServiceMock;
        private readonly Mock<IBookingService> _bookingServiceMock;
        private readonly Mock<IDeviceResolver> _deviceMock;
        private readonly Mock<IImageStorageService> _imageStorageMock;
        private readonly Listing _sampleListing;

        public ListingControllerUnitTest()
        {
            _listingServiceMock = new Mock<IListingService>();
            Mapper.Initialize(a => a.AddProfile<MappingProfile>());
            _mapperMock = Mapper.Instance;
            _appSettingMock = new Mock<IOptions<AppSettings>>();
            _loggerMock = new Mock<ILogger<ListingController>>();
            _authorizationServiceMock = new Mock<IAuthorizationService>();
            _imageServiceMock = new Mock<IImageService>();
            _bookingServiceMock = new Mock<IBookingService>();
            _deviceMock = new Mock<IDeviceResolver>();
            _imageStorageMock = new Mock<IImageStorageService>();

            _sampleListing = new Listing
            {
                Id = 1,
                Header = "This is header",
                Description = "This is description",
                ImageList = new List<Image>
                {
                    new Image {Url = "image1"}
                }
            };
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetFeatureListings_ExpectOneListing()
        {
            _listingServiceMock.Setup(x => x.GetFeatureListings()).ReturnsAsync(() => new List<ListingView>
            {
                new ListingView
                {
                    Id = 1,
                    Header = "This is header",
                    Description = "This is description",
                    SuburbName = "Name",
                    PostCode = 2000,
                    OwnerName = "Boss"
                }
            });
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Act
            var result = (await controller.GetFeatureListings()).ToList();

            // Assert
            result.Count.Should().Be(1);
            var firstListing = result.FirstOrDefault();
            firstListing.Should().NotBeNull();
            firstListing.Id.Should().Be(1);
            firstListing.Header.Should().Be("This is header ...");
            firstListing.Description.Should().Be("This is description");
            firstListing.Location.Should().Be("Name (2000)");
            firstListing.PrimaryOwner.Should().Be("Boss");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetListingDetail_ExpectException()
        {
            _listingServiceMock.Setup(x => x.GetListingDetail(It.IsAny<int>())).ReturnsAsync(() => null);
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await controller.GetListingDetail(10000000));
            ex.Message.Should().Be("Can't find listing\r\nParameter name: id");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetListingDetail_ExpectListingResponse()
        {
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(() => _sampleListing);

            _imageStorageMock.Setup(
                x => x.TransformImageUrls(It.IsAny<List<Image>>(), ImageType.Listing, It.IsAny<IDevice>())).Returns(
                () => new List<Image>
                {
                    new Image {Url = "image1NewUrl"}
                });
                
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var listing = await controller.GetListingDetail(1);

            // Assert
            listing.Should().NotBeNull();
            listing.Should().BeOfType<ListingResponse>();
            listing.Id.Should().Be(1);
            listing.Header.Should().Be(_sampleListing.Header);
            listing.Description.Should().Be(_sampleListing.Description);
            listing.ImageList.Count.Should().Be(_sampleListing.ImageList.Count);
            listing.ImageList.FirstOrDefault().Url = "image1NewUrl";
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetListingWithBookingDetail_ExpectException()
        {
            _listingServiceMock.Setup(x => x.GetListingDetail(It.IsAny<int>())).ReturnsAsync(() => null);
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await controller.GetListingWithBookingDetail(10000000));
            ex.Message.Should().Be("Can't find listing\r\nParameter name: id");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetListingWithBookingDetail_ExpectListingWithNoBookingSlot()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(() => _sampleListing);

            _imageStorageMock.Setup(
                x => x.TransformImageUrls(It.IsAny<List<Image>>(), ImageType.Listing, It.IsAny<IDevice>())).Returns(
                () => new List<Image>
                {
                    new Image {Url = "image1NewUrl"}
                });

            _bookingServiceMock.Setup(x => x.GetBookingSlotsByListingId(1)).ReturnsAsync(() => null);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var result = await controller.GetListingWithBookingDetail(1);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(1);
            result.Header.Should().Be(_sampleListing.Header);
            result.Description.Should().Be(_sampleListing.Description);
            result.ImageList.Count.Should().Be(_sampleListing.ImageList.Count);
            result.ImageList.FirstOrDefault().Url = "image1NewUrl";
            result.BookingSlots.Count.Should().Be(0);
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task GetListingWithBookingDetail_ExpectListingWith1BookingSlot()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(() => _sampleListing);

            _imageStorageMock.Setup(
                x => x.TransformImageUrls(It.IsAny<List<Image>>(), ImageType.Listing, It.IsAny<IDevice>())).Returns(
                () => new List<Image>
                {
                    new Image {Url = "image1NewUrl"}
                });

            _bookingServiceMock.Setup(x => x.GetBookingSlotsByListingId(1)).ReturnsAsync(() =>
                new List<BookingSlot>
                {
                    new BookingSlot {ListingId = 1, Status = BookingStatus.Confirm}
                }
            );

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var result = await controller.GetListingWithBookingDetail(1);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(1);
            result.Header.Should().Be(_sampleListing.Header);
            result.Description.Should().Be(_sampleListing.Description);
            result.ImageList.Count.Should().Be(_sampleListing.ImageList.Count);
            result.ImageList.FirstOrDefault().Url = "image1NewUrl";
            result.BookingSlots.Count.Should().Be(1);
            result.BookingSlots.FirstOrDefault()?.Status.Should().Be(BookingStatus.Confirm);
            result.BookingSlots.FirstOrDefault()?.ListingId.Should().Be(1);
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task InsertListing_ExpectArgumentNullException()
        {
            // Arrange
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.InsertListing(null));
            ex.Message.Should().Be("Value cannot be null.\r\nParameter name: listing");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task InsertListing_ExpectUnauthorizedException()
        {
            // Arrange
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>() , It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Failed);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await controller.InsertListing(_sampleListing));
            ex.Message.Should().Be("Attempted to perform an unauthorized operation.");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task InsertListing_OperationSuccess()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.InsertListing(_sampleListing)).ReturnsAsync(1);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Success);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var newListingId = await controller.InsertListing(_sampleListing);

            // Assert
            newListingId.Should().Be(1);
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task UpdateListing_ExpectArgumentNullException()
        {
            // Arrange
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentNullException>(async () => await controller.UpdateListing(0, null));
            ex.Message.Should().Be("Value cannot be null.\r\nParameter name: listing");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task UpdateListing_ExpectUnauthorizedException()
        {
            // Arrange
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Failed);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await controller.UpdateListing(1, _sampleListing));
            ex.Message.Should().Be("Attempted to perform an unauthorized operation.");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task UpdateListing_OperationSuccess()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.UpdateListing(_sampleListing)).ReturnsAsync(1);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Success);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var records = await controller.UpdateListing(1, _sampleListing);

            // Assert
            records.Should().Be(1);
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeactivateListing_ExpectValidationException()
        {
            // Arrange
            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ValidationException>(async () => await controller.DeactivateListing(-1));
            ex.Message.Should().Be("id");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeactivateListing_ExpectUnauthorizedException()
        {
            // Arrange
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Failed);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await controller.DeactivateListing(1));
            ex.Message.Should().Be("Attempted to perform an unauthorized operation.");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeactivateListing_OperationSuccess()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.DeActivateListing(1)).ReturnsAsync(1);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Success);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var records = await controller.DeactivateListing(1);

            // Assert
            records.Should().Be(1);
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task AddImage_ExpectArgumentOutOfRangeException()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(0)).ReturnsAsync(() => null);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await controller.AddImage(0,new List<IFormFile>()));
            ex.Message.Should().Be("Can't find listing\r\nParameter name: listingId");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task AddImage_ExpectUnauthorizedException()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(_sampleListing);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Failed);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await controller.AddImage(1, new List<IFormFile>()));
            ex.Message.Should().Be("Attempted to perform an unauthorized operation.");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task AddImage_OperationSuccess()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(_sampleListing);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Success);

            _imageServiceMock.Setup(x => x.InsertListingImage(1, It.IsAny<IFormFile>()))
                .ReturnsAsync(new Image {Url = "imageUrl"});

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var records = await controller.AddImage(1,new List<IFormFile>{new FormFile(null, 10 , 10, "name", "fileName") });

            // Assert
            records.Should().NotBeNull();
            records.Count().Should().Be(1);
            records.FirstOrDefault().Url.Should().Be("imageUrl");

        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeleteImage_WithIncorrectListing_ExpectArgumentOutOfRangeException()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(0)).ReturnsAsync(() => null);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await controller.DeleteImage(0, "url"));
            ex.Message.Should().Be("Can't find listing\r\nParameter name: listingId");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeleteImage_WithIncorrectImageUrl_ExpectArgumentOutOfRangeException()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(() => _sampleListing);
            _authorizationServiceMock.Setup(
                x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
            .ReturnsAsync(AuthorizationResult.Success);

            _imageServiceMock.Setup(x => x.FetchListingImageByUrl(1, It.IsAny<string>())).ReturnsAsync(() => null);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await controller.DeleteImage(1, "url"));
            ex.Message.Should().Be("Can't find image\r\nParameter name: url");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeleteImage_ExpectUnauthorizedException()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(_sampleListing);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Failed);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Assert
            var ex = await Assert.ThrowsAsync<UnauthorizedAccessException>(async () => await controller.DeleteImage(1, "url"));
            ex.Message.Should().Be("Attempted to perform an unauthorized operation.");
        }

        [Fact]
        [Trait("UnitTest", "ListingController")]
        public async Task DeleteImage_OperationSuccess()
        {
            // Arrange
            _listingServiceMock.Setup(x => x.GetListingDetail(1)).ReturnsAsync(_sampleListing);
            _authorizationServiceMock.Setup(
                    x => x.AuthorizeAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<object>(), It.IsAny<IEnumerable<IAuthorizationRequirement>>()))
                .ReturnsAsync(AuthorizationResult.Success);

            _imageServiceMock.Setup(x => x.FetchListingImageByUrl(1, "url")).ReturnsAsync(new Image{ImageId=1, Url="url"});
            _imageServiceMock.Setup(x => x.DeleteImage(1,"url")).ReturnsAsync(1);

            var controller = new ListingController(_listingServiceMock.Object, _mapperMock, _appSettingMock.Object,
                _loggerMock.Object,
                _authorizationServiceMock.Object, _imageServiceMock.Object, _bookingServiceMock.Object, _deviceMock.Object,
                _imageStorageMock.Object);

            // Action
            var records = await controller.DeleteImage(1, "url");

            // Assert
            records.Should().Be(1);
        }
    }
}
