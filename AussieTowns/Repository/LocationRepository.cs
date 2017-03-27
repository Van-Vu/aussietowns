using System.Collections.Generic;
using System.Linq;
using AussieTowns.DataAccess;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public class LocationRepository: ILocationRepository
    {
        private readonly AussieTownDBContext _context;

        public LocationRepository(AussieTownDBContext context)
        {
            _context = context;
        }

        public IList<SuburbDetail> GetLocationsByBoundingBox()
        {
            //return _context.SuburbDetails.Take(500).ToList();
            return _context.SuburbDetails.Take(5).ToList();

            //return new List<SuburbDetail>
            //{
            //    new SuburbDetail() {SuburbName = "Sydney", Postcode = 2000, Lat = -33.867139, Lng = 151.207114},
            //    new SuburbDetail() {SuburbName = "Pyrmont", Postcode = 2099, Lat = -33.870, Lng = 151.190}
            //};
        }

        public IQueryable<SuburbDetail> GetLocationsBySuburbName(string name)
        {
            return _context.SuburbDetails.Where(x => x.SuburbName.Contains(name));
        }
    }
}