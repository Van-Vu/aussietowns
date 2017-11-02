using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace AussieTowns.Auth
{
    public class CustomJwtDataFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string algorithm;
        private readonly TokenValidationParameters validationParameters;
        private readonly IDataSerializer<AuthenticationTicket> ticketSerializer;
        private readonly IDataProtector dataProtector;


        public CustomJwtDataFormat(string algorithm, TokenValidationParameters validationParameters,
                    IDataSerializer<AuthenticationTicket> ticketSerializer,
                     IDataProtector dataProtector)

        {
            this.algorithm = algorithm;
            this.validationParameters = validationParameters;
            this.ticketSerializer = ticketSerializer;
            this.dataProtector = dataProtector;
        }

        public AuthenticationTicket Unprotect(string protectedText)
            => Unprotect(protectedText, null);

        public AuthenticationTicket Unprotect(string protectedText, string purpose)
        {
            var handler = new JwtSecurityTokenHandler();
            AuthenticationTicket authTicket = null;

            try
            {
                SecurityToken validToken;
                var principal = handler.ValidateToken(protectedText, this.validationParameters, out validToken);

                var validJwt = validToken as JwtSecurityToken;

                if (validJwt == null)
                {
                    throw new ArgumentException("Invalid JWT");
                }

                //if (!validJwt.Header.Alg.Equals(algorithm, StringComparison.Ordinal))
                //{
                //    throw new ArgumentException($"Algorithm must be '{algorithm}'");
                //}


                return new AuthenticationTicket(principal, "Cookie");
            }
            catch (SecurityTokenValidationException)
            {
                return null;
            }
            catch (ArgumentException)
            {
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
