using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.DataAccess;
using AussieTowns.Model;
using Microsoft.EntityFrameworkCore;

namespace AussieTowns.Repository
{
    public class TourRepository: ITourRepository
    {
        private readonly AussieTownDBContext _context;

        public TourRepository(AussieTownDBContext context)
        {
            _context = context;
        }

        public IQueryable<TourOffer> GetTourOffers()
        {
            return _context.TourOffers.AsNoTracking();
        }

        public TourOffer GetTourOfferById(int id)
        {
            return _context.TourOffers.AsNoTracking().SingleOrDefault(x => x.Id == id);
        }

        public bool InsertTourOffer(TourOffer tourOffer)
        {
            try
            {
                _context.TourOffers.Add(tourOffer);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public bool UpdateTourOffer(TourOffer tourOffer)
        {
            try
            {
                _context.DetachEntity<TourOffer>(tourOffer.Id);

                _context.Entry(tourOffer).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public bool DeleteTourOffer(int id)
        {
            try
            {
                var tourOffer = GetTourOfferById(id);
                _context.TourOffers.Remove(tourOffer);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public IQueryable<TourRequest> GetTourRequests()
        {
            return _context.TourRequests;
        }

        public TourRequest GetTourRequestById(int id)
        {
            return _context.TourRequests.SingleOrDefault(x => x.Id == id);
        }

        public bool InsertTourRequest(TourRequest tourRequest)
        {
            try
            {
                _context.TourRequests.Add(tourRequest);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return true;
        }

        public bool UpdateTourRequest(TourRequest tourRequest)
        {
            try
            {
                _context.DetachEntity<TourRequest>(tourRequest.Id);

                _context.Entry(tourRequest).State = EntityState.Modified;
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteTourRequest(int id)
        {
            try
            {
                var tourRequest = GetTourRequestById(id);
                _context.TourRequests.Remove(tourRequest);

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
