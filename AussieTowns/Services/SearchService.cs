using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Logging;
using Serilog.Events;


namespace AussieTowns.Services
{
    public class SearchService: ISearchService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly ILogger _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SearchService(ILocationRepository locationRepository, ILogger<SearchService> logger, IHttpContextAccessor httpContextAccessor)
        {
            if (locationRepository == null) throw new ArgumentNullException(nameof(locationRepository));
            _locationRepository = locationRepository;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }


        public IList<SuburbDetail> SearchByBoundingBox()
        {
            //return _locationRepository.GetLocationsByBoundingBox();
            _logger.LogError("log from Search service");

            // Bodom: access host value
            var request = _httpContextAccessor.HttpContext?.Request;
            var resetLink = $"{request.Scheme}://{request.Host}/resetpassword/";
            var url = _httpContextAccessor.HttpContext?.Request?.GetDisplayUrl();
            var test = _httpContextAccessor;

            _locationRepository.TestLogger();
            return null;
        }

        public async Task<IEnumerable<SuburbDetail>> SearchBySuburbName(string name)
        {
            return await _locationRepository.GetLocationBySuburbName(name);
        }
    }
}