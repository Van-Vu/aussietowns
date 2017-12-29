using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface ISettingsRepository
    {
        Task<IEnumerable<Hobby>> GetHobbies();
    }
}
