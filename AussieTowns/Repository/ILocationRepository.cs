using System.Collections.Generic;
using System.Linq;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface ILocationRepository
    {
        IList<SuburbDetail> GetLocationsByBoundingBox();
        IQueryable<SuburbDetail> GetLocationsBySuburbName(string name);
    }
}