using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.Logging;

namespace AussieTowns.Auth
{
    public class ProfileAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, User>
    {
        private readonly ILogger<ProfileAuthorizationHandler> _logger;

        public ProfileAuthorizationHandler(ILogger<ProfileAuthorizationHandler> logger)
        {
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, User user)
        {
            if (requirement.Name == "Read")
            {
                context.Succeed(requirement);
            }
            else
            {
                var userId = context.User.FindFirst(c => c.Type == "userId" && c.Issuer == TokenAuthOption.Issuer)?.Value;
                var role = context.User.FindFirst(c => c.Type.Contains("role") && c.Issuer == TokenAuthOption.Issuer)?.Value;

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
                {
                    context.Fail();
                }
                else
                {
                    //Author
                    if (Convert.ToInt32(userId) == user.Id)
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        //Role
                        switch (requirement.Name)
                        {
                            case "Update":
                                if (Convert.ToInt32(role) > (int)UserRole.User)
                                {
                                    context.Succeed(requirement);
                                }
                                else
                                {
                                    context.Fail();
                                }
                                break;
                            case "Delete":
                                if (Convert.ToInt32(role) == (int)UserRole.SuperAdmin)
                                {
                                    context.Succeed(requirement);
                                }
                                else
                                {
                                    context.Fail();
                                }
                                break;
                        }
                    }
                }
            }

            return Task.FromResult(0);
        }
    }
}
