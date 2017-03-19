using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface ITourService
    {
        IEnumerable<TourOffer> GetTourOffers();
        TourOffer GetTourOfferDetail(int it);
        bool AddTourOffer(TourOffer tourOffer);
        bool UpdateTourOffer(TourOffer tourOffer);
        bool DeleteTourOffer(int id);

        IEnumerable<TourRequest> GetTourRequests();
        TourRequest GetTourRequestDetail(int id);
        bool AddTourRequest(TourRequest tourRequest);
        bool UpdateTourRequest(TourRequest tourRequest);
        bool DeleteTourRequest(int id);
    }
}
