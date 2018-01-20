using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace FunWithLocal.WebApi.Auth
{
    public class CustomJwtDataFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string algorithm;
        private readonly TokenValidationParameters validationParameters;
        private readonly IDataSerializer<AuthenticationTicket> ticketSerializer;
        private readonly IDataProtector dataProtector;
        private readonly IHostingEnvironment _hostingEnvironment;


        public CustomJwtDataFormat(string algorithm, TokenValidationParameters validationParameters,
                    IDataSerializer<AuthenticationTicket> ticketSerializer,
                     IDataProtector dataProtector, IHostingEnvironment hostingEnvironment)

        {
            this.algorithm = algorithm;
            this.validationParameters = validationParameters;
            this.ticketSerializer = ticketSerializer;
            this.dataProtector = dataProtector;
            _hostingEnvironment = hostingEnvironment;
        }

        public AuthenticationTicket Unprotect(string protectedText)
            => Unprotect(protectedText, null);

        public AuthenticationTicket Unprotect(string protectedText, string purpose)
        {
            var handler = new JwtSecurityTokenHandler();
            AuthenticationTicket authTicket = null;

            try
            {
                if (_hostingEnvironment.IsEnvironment("Testing"))
                {
                    var identity = new ClaimsIdentity(
                        new GenericIdentity("test@intgration.com", "TokenAuth"),
                        new[] {
                            new Claim("userId", "1",null,TokenAuthOption.Issuer),
                            new Claim("role", "8",null,TokenAuthOption.Issuer)
                        }
                    );
                    var claimsPrincipal = new ClaimsPrincipal(identity);
                    return new AuthenticationTicket(claimsPrincipal, "Cookie");
                }

                SecurityToken validToken;
                var principal = handler.ValidateToken(protectedText, this.validationParameters, out validToken);

                var validJwt = validToken as JwtSecurityToken;

                if (validJwt == null)
                {
                    throw new ArgumentException("JWT is null");
                }

                if (validJwt.Issuer != TokenAuthOption.Issuer)
                {
                    throw new ArgumentException("Invalid Issuer:" + validJwt.Issuer);
                }

                if (validJwt.Audiences.FirstOrDefault() != TokenAuthOption.Audience)
                {
                    throw new ArgumentException("Invalid Audiences:" + validJwt.Audiences.FirstOrDefault());
                }

                return new AuthenticationTicket(principal, "Cookie");
            }
            catch (SecurityTokenValidationException)
            {
                return null;
            }
            catch (ArgumentException exception)
            {
                var abc = exception;
                return null;
            }

        }

        public string Protect(AuthenticationTicket data) =>
                           this.Protect(data, null);

        public string Protect(AuthenticationTicket data, string purpose)
        {
            byte[] array = this.ticketSerializer.Serialize(data);
            IDataProtector dataProtector = this.dataProtector;

            if (!string.IsNullOrEmpty(purpose))
            {
                dataProtector = dataProtector.CreateProtector(purpose);
            }

            return Base64UrlTextEncoder.Encode(dataProtector.Protect(array));

        }
    }
}
