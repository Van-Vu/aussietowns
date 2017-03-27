using System.Collections.Generic;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface ISearchService
    {
        IList<SuburbDetail> SearchByBoundingBox();

        IList<SuburbDetail> SearchBySuburbName(string name);
    }
}