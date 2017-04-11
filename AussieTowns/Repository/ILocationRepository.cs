using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface ILocationRepository
    {
        IEnumerable<SuburbDetail> GetLocationsByBoundingBox();
        Task<IEnumerable<SuburbDetail>> GetLocationBySuburbName(string suburbName);
    }
}