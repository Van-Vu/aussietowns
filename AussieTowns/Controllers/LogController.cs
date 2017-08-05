using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class LogController: Controller
    {
        private readonly ILogger<LogController> _logger;

        public LogController(ILogger<LogController> logger)
        {
            _logger = logger;
        }

        [HttpPost("Error")]
        public async Task<int> LogError([FromForm] string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                _logger.LogError("Client error: {message}", message);
            }

            return 0;
        }
    }
}
