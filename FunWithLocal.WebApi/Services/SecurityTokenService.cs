using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using FunWithLocal.WebApi.Auth;
using FunWithLocal.WebApi.Model;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.IdentityModel.Tokens;

namespace FunWithLocal.WebApi.Services
{
    public class SecurityTokenService: ISecurityTokenService
    {
        private JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

        private readonly IDataProtectionProvider _dataProtectionProvider;

        public SecurityTokenService(IDataProtectionProvider dataProtectionProvider)
        {
            _dataProtectionProvider = dataProtectionProvider;
        }


        // JWT token
        public JwtSecurityToken ParseToken(string tokenString)
        {
            TokenValidationParameters validationParams =
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = TokenAuthOption.Key,
                    ValidateIssuer = true,
                    ValidIssuer = TokenAuthOption.Issuer,
                    ValidateAudience = true,
                    ValidAudience = TokenAuthOption.Audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

            SecurityToken token;
            var p = handler.ValidateToken(tokenString, validationParams, out token);
            return (JwtSecurityToken)token;
        }

        public string CreateTokenString(User user, DateTime expires)
        {
            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.Email, "TokenAuth"),
                new[] {
                    new Claim("userId", user.Id.ToString()),
                    new Claim("role", user.Role.ToString()),
                }
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = TokenAuthOption.Issuer,
                Audience = TokenAuthOption.Audience,
                SigningCredentials = TokenAuthOption.SigningCredentials,
                Subject = identity,
                Expires = expires
            });
            return handler.WriteToken(securityToken);
        }

        // Data protection
        public string Encrypt(string input)
        {
            var protector = _dataProtectionProvider.CreateProtector(TokenAuthOption.SecretSigningKey);
            return protector.Protect(input);
        }

        public string Decrypt(string cipherText)
        {
            var protector = _dataProtectionProvider.CreateProtector(TokenAuthOption.SecretSigningKey);
            return protector.Unprotect(cipherText);
        }
    }
}
