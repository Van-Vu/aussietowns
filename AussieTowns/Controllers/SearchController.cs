using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly ISearchService _searchService;
        private readonly IMapper _mapper;

        public SearchController(ISearchService searchService, IMapper mapper)
        {
            _searchService = searchService;
            _mapper = mapper;
        }

        [HttpPost]
        public IEnumerable<SuburbDetail> SearchByBoundingBox(BoundingBox boundingBox)
        {
            return _searchService.SearchByBoundingBox();
        }

        [HttpGet]
        [Route("detail/{postcode}")]
        public SuburbDetail GetSuburbDetail(int postCode)
        {
            return new SuburbDetail
            {
                Detail = string.Format("this is a request on postcode {0}", postCode)
            };

            //return null;
        }

        [HttpGet]
        [Route("autocomplete")]
        public async Task<IEnumerable<AutoCompleteItem>> GetAutocomplete([FromQuery] string search)
        {
            try
            {
                var suburbs = await _searchService.SearchBySuburbName(search);
                return suburbs.Select(suburb => _mapper.Map<SuburbDetail, AutoCompleteItem>(suburb));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
    }
}
