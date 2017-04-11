using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class ListingController : Controller
    {
        private readonly IListingService _listingService;
        private readonly IMapper _mapper;

        public ListingController(IListingService listingService, IMapper mapper)
        {
            _listingService = listingService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [HttpGet("summary/{id}")]
        public async Task<RequestResult> GetListingDetail(int id)
        {
            try
            {
                var listing = await _listingService.GetListingDetail(id);

                if (Request.Path.Value.IndexOf("listingsummary", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                {
                    return new RequestResult
                    {
                        State = RequestState.Success,
                        Data = _mapper.Map<Listing, ListingSummary>(listing)
                    };
                }

                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = _mapper.Map<Listing,ListingResponse>(listing)
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong :" + ex
                };
            }
        }

        [HttpPost]
        public async Task<RequestResult> InsertListing([FromBody] Listing listing)
        {
            try
            {
                if (listing == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                var newId = await _listingService.InsertListing(listing);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = newId
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                };
            }
        }

        [HttpPut("{id}")]
        public async Task<RequestResult> UpdateListing(int id,[FromBody] Listing listing)
        {
            try
            {
                if (listing == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = await _listingService.UpdateListing(listing)
                };
            }
            catch (Exception)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                };
            }
        }

        [HttpDelete("{id}")]
        public async Task<RequestResult> DeleteTourOffer(int id)
        {
            try
            {
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = await _listingService.DeleteListing(id)
                };
            }
            catch (Exception)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                };
            }
        }

        [HttpGet]
        public async Task<RequestResult> GetToursByUserId([FromQuery] int user)
        {
            try
            {
                var listingsSummary = await _listingService.GetListingsByUserId(user); //.Select(listing => _mapper.Map<Listing,ListingSummary>(listing));
                
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = listingsSummary.Select(listing => _mapper.Map<Listing, ListingSummary>(listing))
                };

            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Something is wrong: " + ex.Message
                };
            }
        }

        [HttpGet("suburb/{suburbid}")]
        public async Task<RequestResult> GetToursBySuburb(int suburbid)
        {
            try
            {
                //var listingsSummary = _listingService.GetListingsBySuburb(suburbid).Select(listing => _mapper.Map<Listing, ListingSummary>(listing));
                var listingsSummary = await _listingService.GetListingsBySuburb(suburbid);

                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = listingsSummary
                };

            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Something is wrong: " + ex.Message
                };
            }
        }

        private HttpResponseMessage ResponseHandleException<TResult>(Task<TResult> taskResult, object originalRequest)
        {
            //if (!taskResult.IsFaulted && taskResult.Exception == null)
            //{
            //    return new HttpResponseMessage(HttpStatusCode.OK) { Content = taskResult.Result };
            //}

            ////_logger.Error(taskResult.Exception?.InnerExceptions[0], "[AussieTown-WebApi] ERROR found processing request");

            //var aggException = taskResult.Exception as AggregateException;
            //return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            //{
            //    Content = new JsonContent(aggException?.InnerException),
            //    RequestMessage = new HttpRequestMessage { Content = new JsonContent(originalRequest ?? "") }
            //};

            return null;
        }
    }
}
