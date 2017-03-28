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
    public class TourController : Controller
    {
        private readonly ITourService _tourService;
        private readonly IMapper _mapper;

        public TourController(ITourService tourService, IMapper mapper)
        {
            _tourService = tourService;
            _mapper = mapper;
        }


        [HttpGet("offer")]
        [HttpGet("offer/listing")]
        public object GetTourOffer()
        {
            try
            {
                var offers = _tourService.GetTourOffers();

                if (Request.Path.Value.IndexOf("listing", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                {
                    return JsonConvert.SerializeObject(new RequestResult
                    {
                        State = RequestState.Success,
                        Data = offers.Select(offer => _mapper.Map<TourOffer, ListingOffer>(offer))
                    });
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = offers
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

        [HttpGet("offer/{id}")]
        [HttpGet("offer/listing/{id}")]
        public object GetTourOfferDetail(int id)
        {
            try
            {
                var offer = _tourService.GetTourOfferDetail(id);

                if (Request.Path.Value.IndexOf("listing", 0, StringComparison.CurrentCultureIgnoreCase) > 0)
                {
                    return JsonConvert.SerializeObject(new RequestResult
                    {
                        State = RequestState.Success,
                        Data = _mapper.Map<TourOffer, ListingOffer>(offer)
                    });
                }

                //Bodom: dirty hack
                var serializerSetting = new JsonSerializerSettings {ReferenceLoopHandling = ReferenceLoopHandling.Ignore};

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = offer
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

        [HttpPost("offer")]
        public object AddTourOffer([FromBody] TourOffer tourOffer)
        {
            try
            {
                if (tourOffer == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.AddTourOffer(tourOffer)
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

        [HttpPut("offer/{id}")]
        public object EditTourOffer(int id,[FromBody] TourOffer tourOffer)
        {
            try
            {
                if (tourOffer == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.UpdateTourOffer(tourOffer)
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

        [HttpDelete("offer/{id}")]
        public object DeleteTourOffer(int id)
        {
            try
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.DeleteTourOffer(id)
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

        [HttpGet("request")]
        public object GetTourRequest()
        {
            try
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.GetTourRequests()
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

        [HttpGet("request/{id}")]
        public object GetTourRequestDetail(int id)
        {
            try
            {
                if (id <= 0)
                {
                    throw new Exception("Value is invalid !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.GetTourRequestDetail(id)
                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong: " + ex.Message
                });
            }
        }

        [HttpPost("request")]
        public object AddTourRequest([FromBody] TourRequest tourRequest)
        {
            try
            {
                if (tourRequest == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.AddTourRequest(tourRequest)
                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong: " + ex.Message
                });
            }
        }

        [HttpPut("request/{id}")]
        public object EditTourRequest(int id,[FromBody] TourRequest tourRequest)
        {
            try
            {
                if (tourRequest == null)
                {
                    throw new Exception("Value cannot be null !");
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.UpdateTourRequest(tourRequest)
                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong: " + ex.Message
                });
            }
        }

        [HttpDelete("request/{id}")]
        public object DeleteTourRequest(int id)
        {
            try
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = _tourService.DeleteTourRequest(id)
                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Something is wrong: " + ex.Message
                });
            }
        }
    }
}
