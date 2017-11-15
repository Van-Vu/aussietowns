using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface ISecurityTokenService
    {
        JwtSecurityToken ParseToken(string tokenString);
        string CreateTokenString(User user, DateTime utcExpiry);

        string Encrypt(string input);
        string Decrypt(string cipherText);
    }
}
