using System;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Auth
{
    public class BookingAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, BookingResponse>
    {
        private readonly ILogger<ProfileAuthorizationHandler> _logger;

        public BookingAuthorizationHandler(ILogger<ProfileAuthorizationHandler> logger)
        {
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, BookingResponse booking)
        {
            var userId = context.User.FindFirst(c => c.Type == "userId" && c.Issuer == TokenAuthOption.Issuer)?.Value;
            var role = context.User.FindFirst(c => c.Type.Contains("role") && c.Issuer == TokenAuthOption.Issuer)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
            {
                context.Fail();
            }
            else
            {
                // Role
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


                // Author
                var userIdInt = Convert.ToInt32(userId);
                var tourOperator = booking.Listing.TourOperators.FirstOrDefault(x => x.Id == userIdInt && x.IsPrimary);
                if (tourOperator == null)
                {
                    var tourGuest = booking.Participants.FirstOrDefault(x => x.ExistingUserId == userIdInt);
                    if (tourGuest == null)
                    {
                        context.Fail();
                    }
                    else
                    {
                        context.Succeed(requirement);
                    }
                }
                else
                {
                    context.Succeed(requirement);
                }
            }

            return Task.FromResult(0);
        }
    }
}
