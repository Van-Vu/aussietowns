using System.Collections.Generic;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface ILocationRepository
    {
        IList<SuburbDetail> GetLocationsByBoundingBox();
    }
}