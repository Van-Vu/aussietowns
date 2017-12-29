using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace FunWithLocal.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController: Controller
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet("hobbies")]
        public async Task<IEnumerable<Hobby>> GetAllHobbies()
        {
            return await _settingsService.GetHobbies();
        }
    }
}
