using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface ISettingsService
    {
        Task<IEnumerable<Hobby>> GetHobbies();
    }
}
