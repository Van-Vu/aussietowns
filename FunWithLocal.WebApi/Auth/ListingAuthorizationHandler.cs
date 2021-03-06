﻿using System;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using FunWithLocal.WebApi.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Auth
{
    public class ListingAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, Listing>
    {
        private readonly ILogger<ListingAuthorizationHandler> _logger;

        public ListingAuthorizationHandler(ILogger<ListingAuthorizationHandler> logger)
        {
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, Listing listing)
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
                    var primaryOperator = listing.TourOperators?.FirstOrDefault(x => x.IsPrimary);
                    if (primaryOperator != null && Convert.ToInt32(userId) == primaryOperator.UserId)
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        //Role
                        switch (requirement.Name)
                        {
                            case "Update":
                                if (Convert.ToInt32(role) > (int) UserRole.User)
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

            //context.User.Claims
            return Task.FromResult(0);
        }
    }
}
