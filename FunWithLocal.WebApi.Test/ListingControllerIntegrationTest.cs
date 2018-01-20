using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using FluentAssertions;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using FunWithLocal.WebApi.Test.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Xunit;

namespace FunWithLocal.WebApi.Test
{
    [Collection("TestServer collection")]
    public class ListingControllerIntegrationTest
    {
        private readonly TestServerFixture _fixture;

        public ListingControllerIntegrationTest(TestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task GetListingFeature_Expects3Listings()
        {
            // Act
            var response = await _fixture.Client.GetAsync("/api/listing/feature");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();

            // Assert
            var listings = JsonConvert.DeserializeObject<IEnumerable<ListingSummary>>(responseString);
            listings.Count().Should().Be(3);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task GetListingDetail_Expects404()
        {
            // Act
            var response = await _fixture.Client.GetAsync("/api/listing/1");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task GetListingDetail_ExpectsCorrectListing()
        {
            // Act
            var response = await _fixture.Client.GetAsync("/api/listing/3");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();

            // Assert
            var listing = JsonConvert.DeserializeObject<ListingResponse>(responseString);
            listing.Should().NotBeNull();
            listing.Id.Should().Be(3);
            listing.LocationDetail.Should().NotBeNull();
            listing.LocationDetail.Id.Should().Be(139);
            listing.Cost.Should().Be(50);
            listing.Header.Should().Be("desc");
            listing.Description.Should().Be("expect");
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task GetListingWithBookingDetail_Expects404()
        {
            // Act
            var response = await _fixture.Client.GetAsync("/api/listing/1/booking");

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task GetListingWithBookingDetail_ExpectsCorrectListing()
        {
            // Arrange
            var bookingService = _fixture.GetService<IBookingService>();
            var newBookingId = await bookingService.AddBooking(new BookingRequest
            {
                ListingId = 3,
                BookingDate = new DateTime(2000, 1, 1),
                Time = new TimeSpan(1, 1, 1),
                Participants = new List<TourGuest>
                {
                    new TourGuest {Id=1, FirstName="firstName", LastName="lastName"}
                }
            });

            // Act
            var response = await _fixture.Client.GetAsync("/api/listing/3/booking");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();

            // Assert
            var listing = JsonConvert.DeserializeObject<ListingResponse>(responseString);
            listing.Should().NotBeNull();
            listing.Id.Should().Be(3);
            listing.LocationDetail.Should().NotBeNull();
            listing.LocationDetail.Id.Should().Be(139);
            listing.Cost.Should().Be(50);
            listing.Header.Should().Be("desc");
            listing.Description.Should().Be("expect");
            listing.BookingSlots.Count.Should().Be(1);
            var firstBookingSlot = listing.BookingSlots.FirstOrDefault();
            firstBookingSlot.Should().NotBeNull();
            firstBookingSlot?.ListingId.Should().Be(3);
            firstBookingSlot?.BookingDate.Should().Be(new DateTime(2000, 1, 1).ToString("yyyy/MM/dd"));
            firstBookingSlot?.StartTime.Should().Be(new TimeSpan(1, 1, 1).ToString(@"hh\:mm"));
            firstBookingSlot?.Status.Should().Be(BookingStatus.Pending);

            // Cleanup
            await bookingService.DeleteBooking(newBookingId);
        }

        [Fact(Skip = "can't create null object")]
        [Trait("IntegrationTest", "ListingController")]
        public async Task InsertListing_Expects400()
        {
            // Act
            var response = await _fixture.Client.PostAsync("/api/listing", new StringContent(null, Encoding.UTF8, "application/json"));

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task InsertListing_Expects403()
        {
            // Act
            var response = await _fixture.Client.PostAsync("/api/listing", new StringContent(JsonConvert.SerializeObject(new Listing()), Encoding.UTF8, "application/json"));

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task InsertListing_ExpectsListingInserted()
        {
            // Arrange
            var sampleListing = new Listing
            {
                Header = "Testheader",
                Description = "Testdescription",
                Cost = 50,
                LocationId = 139,
                TourOperators = new List<TourOperator>
                {
                    new TourOperator {UserId = 1, IsPrimary=true}
                }
            };
            var stringContent = new StringContent(JsonConvert.SerializeObject(sampleListing), Encoding.UTF8, "application/json");

            // Act
            _fixture.Client.DefaultRequestHeaders.Add("Cookie", "mtltk='testCookies'");
            var response = await _fixture.Client.PostAsync("/api/listing", stringContent);

            response.EnsureSuccessStatusCode();
            var newListingId = await response.Content.ReadAsStringAsync();

            // Assert
            var listingService = _fixture.GetService<IListingService>();
            var listing = await listingService.GetListingDetail(Convert.ToInt32(newListingId));
            listing.Header.Should().Be("Testheader");
            listing.Description.Should().Be("Testdescription");
            listing.Cost.Should().Be(50);
            listing.IsActive.Should().Be(true);
            listing.LocationId.Should().Be(139);
            listing.TourOperators.Count.Should().Be(1);
            listing.TourOperators.FirstOrDefault().UserId = 1;
            listing.TourOperators.FirstOrDefault().IsPrimary = true;

            // Cleanup
            await listingService.DeleteListing(Convert.ToInt32(newListingId));
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task UpdateListing_Expects403()
        {
            // Act
            var response = await _fixture.Client.PostAsync("/api/listing/1", new StringContent(JsonConvert.SerializeObject(new Listing()), Encoding.UTF8, "application/json"));

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task UpdateListing_ExpectsListingUpdated()
        {
            // Arrange
            var listingService = _fixture.GetService<IListingService>();
            var sampleListing = new Listing
            {
                Header = "Testheader",
                Description = "Testdescription",
                Cost = 50,
                LocationId = 139,
                TourOperators = new List<TourOperator>
            {
                new TourOperator {UserId = 1, IsPrimary=true}
            }
            };
            var newListingId = await listingService.InsertListing(sampleListing);
            sampleListing.Id = newListingId;
            sampleListing.Header = "TestHeader Edit";
            sampleListing.Description = "Testdescription Edit";
            sampleListing.Cost = 100;

            var stringContent = new StringContent(JsonConvert.SerializeObject(sampleListing), Encoding.UTF8, "application/json");

            // Act
            _fixture.Client.DefaultRequestHeaders.Add("Cookie", "mtltk='testCookies'");
            var response = await _fixture.Client.PostAsync($"/api/listing/{newListingId}", stringContent);

            response.EnsureSuccessStatusCode();

            // Assert
            var listing = await listingService.GetListingDetail(sampleListing.Id);
            listing.Header.Should().Be("TestHeader Edit");
            listing.Description.Should().Be("Testdescription Edit");
            listing.Cost.Should().Be(100);
            listing.IsActive.Should().Be(true);

            // Cleanup
            await listingService.DeleteListing(sampleListing.Id);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task DeactivateListing_Expects400()
        {
            // Act
            var response = await _fixture.Client.PostAsync("/api/listing/0/remove", null);

            // Assert
            Convert.ToInt32(response.StatusCode).Should().Be(422);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task DeactivateListing_Expects403()
        {
            // Act
            var response = await _fixture.Client.PostAsync("/api/listing/1/remove",null);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        [Fact]
        [Trait("IntegrationTest", "ListingController")]
        public async Task DeactivateListing_ExpectsListingDeactivate()
        {
            // Arrange
            var listingService = _fixture.GetService<IListingService>();
            var sampleListing = new Listing
            {
                Header = "Testheader",
                Description = "Testdescription",
                Cost = 50,
                LocationId = 139,
                TourOperators = new List<TourOperator>
            {
                new TourOperator {UserId = 1, IsPrimary=true}
            }
            };
            var newListingId = await listingService.InsertListing(sampleListing);

            // Act
            _fixture.Client.DefaultRequestHeaders.Add("Cookie", "mtltk='testCookies'");
            var response = await _fixture.Client.PostAsync($"/api/listing/{newListingId}/remove", null);

            response.EnsureSuccessStatusCode();

            // Assert
            var listing = await listingService.GetListingDetail(newListingId);
            listing.IsActive.Should().Be(false);

            // Cleanup
            await listingService.DeleteListing(newListingId);
        }
    }
}
