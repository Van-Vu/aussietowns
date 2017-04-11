using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface ISearchService
    {
        IList<SuburbDetail> SearchByBoundingBox();

        Task<IEnumerable<SuburbDetail>> SearchBySuburbName(string name);
    }
}