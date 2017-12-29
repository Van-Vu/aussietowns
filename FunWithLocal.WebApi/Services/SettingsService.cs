using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;

namespace FunWithLocal.WebApi.Services
{
    public class SettingsService: ISettingsService
    {
        private readonly ISettingsRepository _settingsRepository;

        public SettingsService(ISettingsRepository settingsRepository)
        {
            _settingsRepository = settingsRepository;
        }

        public async Task<IEnumerable<Hobby>> GetHobbies()
        {
            return await _settingsRepository.GetHobbies();
        }
    }
}
