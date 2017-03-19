using System;
using System.Collections.Generic;
using AussieTowns.Model;
using AussieTowns.Repository;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;

namespace AussieTowns.Services
{
    public class TourService: ITourService
    {
        private readonly ITourRepository _tourRepository;

        public TourService(ITourRepository tourRepository)
        {
            _tourRepository = tourRepository;
        }

        public IEnumerable<TourOffer> GetTourOffers()
        {
            return _tourRepository.GetTourOffers();
        }

        public TourOffer GetTourOfferDetail(int id)
        {
            return _tourRepository.GetTourOfferById(id);
        }

        public bool AddTourOffer(TourOffer tourOffer)
        {
            return _tourRepository.InsertTourOffer(tourOffer);
        }

        public bool UpdateTourOffer(TourOffer tourOffer)
        {
            return _tourRepository.UpdateTourOffer(tourOffer);
        }

        public bool DeleteTourOffer(int id)
        {
            return _tourRepository.DeleteTourOffer(id);
        }

        public IEnumerable<TourRequest> GetTourRequests()
        {
            return _tourRepository.GetTourRequests();
        }

        public TourRequest GetTourRequestDetail(int id)
        {
            return _tourRepository.GetTourRequestById(id);
        }

        public bool AddTourRequest(TourRequest tourRequest)
        {
            return _tourRepository.InsertTourRequest(tourRequest);
        }

        public bool UpdateTourRequest(TourRequest tourRequest)
        {
            return _tourRepository.UpdateTourRequest(tourRequest);
        }

        public bool DeleteTourRequest(int id)
        {
            return _tourRepository.DeleteTourRequest(id);
        }
    }
}
