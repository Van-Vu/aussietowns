using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunWithLocal.WebApi.Filters
{
    public class ValidateOriginOptions
    {
        public List<string> WhitelistedOrigins { get; set; }
    }
}
