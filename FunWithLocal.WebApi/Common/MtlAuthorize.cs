using System;
using Microsoft.AspNetCore.Authorization;

namespace FunWithLocal.WebApi.Common
{
    public class MtlAuthorize : AuthorizeAttribute
    {
        public MtlAuthorize(UserRole role) : base()
        {
            var code = role.GetHashCode();
            foreach (var item in Enum.GetValues(typeof(UserRole)))
            {
                int tmpCode = item.GetHashCode();
                if (tmpCode >= code)
                {
                    Roles = item.ToString();
                    return;
                }
            }
            
        }
    }
}
