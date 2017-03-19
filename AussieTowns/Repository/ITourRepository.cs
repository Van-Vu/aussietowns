using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface ITourRepository
    {
        IQueryable<TourOffer> GetTourOffers();
        TourOffer GetTourOfferById(int id);
        bool InsertTourOffer(TourOffer tourOffer);
        bool UpdateTourOffer(TourOffer tourOffer);
        bool DeleteTourOffer(int id);

        IQueryable<TourRequest> GetTourRequests();
        TourRequest GetTourRequestById(int id);
        bool InsertTourRequest(TourRequest tourRequest);
        bool UpdateTourRequest(TourRequest tourRequest);
        bool DeleteTourRequest(int id);
    }
}
