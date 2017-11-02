using System;
using Microsoft.IdentityModel.Tokens;

namespace AussieTowns.Auth
{
    public class TokenAuthOption
    {
        public static string Audience { get; } = "https://www.funwithlocal.com";
        public static string Issuer { get; } = "www.funwithlocal.com";
        public static RsaSecurityKey Key { get; } = new RsaSecurityKey(RSAKeyHelper.GenerateKey());
        public static SigningCredentials SigningCredentials { get; } = new SigningCredentials(Key, SecurityAlgorithms.RsaSha256Signature);

        public static TimeSpan ExpiresSpan { get; } = TimeSpan.FromMinutes(40);
        public static string TokenType { get; } = "Bearer";
    }
}
