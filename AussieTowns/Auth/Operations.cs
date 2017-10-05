using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace AussieTowns.Auth
{
    public static class Operations
    {
        public static OperationAuthorizationRequirement Create = new OperationAuthorizationRequirement { Name = Enum.GetName(typeof(OperationAuthorizationType), OperationAuthorizationType.Create)};
        public static OperationAuthorizationRequirement Read = new OperationAuthorizationRequirement { Name = Enum.GetName(typeof(OperationAuthorizationType), OperationAuthorizationType.Read)};
        public static OperationAuthorizationRequirement Update = new OperationAuthorizationRequirement { Name = Enum.GetName(typeof(OperationAuthorizationType), OperationAuthorizationType.Update)};
        public static OperationAuthorizationRequirement Delete = new OperationAuthorizationRequirement { Name = Enum.GetName(typeof(OperationAuthorizationType), OperationAuthorizationType.Delete)};
    }
}
