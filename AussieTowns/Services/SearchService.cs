using System;
using System.Collections.Generic;
using AussieTowns.Model;
using AussieTowns.Repository;

namespace AussieTowns.Services
{
    public class SearchService: ISearchService
    {
        private readonly ILocationRepository _locationRepository;

        public SearchService(ILocationRepository locationRepository)
        {
            if (locationRepository == null) throw new ArgumentNullException(nameof(locationRepository));
            _locationRepository = locationRepository;
        }


        public IList<SuburbDetail> SearchByBoundingBox()
        {
            return _locationRepository.GetLocationsByBoundingBox();
        }
    }
}