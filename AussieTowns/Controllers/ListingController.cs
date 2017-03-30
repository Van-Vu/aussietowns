using System;
using System.Collections.Generic;
using System.Linq;
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
        public object GetListingDetail(int id)
        {
            try
            {
                var listing = _listingService.GetListingDetail(id);

                if (Request.Path.Value.IndexOf("listingsummary", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                {
                    return JsonConvert.SerializeObject(new RequestResult
                    {
                        State = RequestState.Success,
                        Data = _mapper.Map<Listing, ListingSummary>(listing)
                    });
                }

                //Bodom: dirty hack
                var serializerSetting = new JsonSerializerSettings {ReferenceLoopHandling = ReferenceLoopHandling.Ignore};

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = listing
                }, serializerSetting);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong :" + ex
                });
            }
        }

        [HttpPost]
        public object InsertListing([FromBody] Listing listing)
        {
            try
            {
                if (listing == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _listingService.InsertListing(listing)
                });
            }
            catch (Exception)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                });
            }
        }

        [HttpPut("{id}")]
        public object UpdateListing(int id,[FromBody] Listing listing)
        {
            try
            {
                if (listing == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _listingService.UpdateListing(listing)
                });
            }
            catch (Exception)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                });
            }
        }

        [HttpDelete("{id}")]
        public object DeleteTourOffer(int id)
        {
            try
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _listingService.DeleteListing(id)
                });
            }
            catch (Exception)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong !"
                });
            }
        }

        [HttpGet]
        public string GetToursByUserId([FromQuery] int user)
        {
            try
            {
                var listingsSummary = _listingService.GetListingsByUserId(user).Select(listing => _mapper.Map<Listing,ListingSummary>(listing));
                
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = listingsSummary
                });

            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Something is wrong: " + ex.Message
                });
            }
        }
    }
}
