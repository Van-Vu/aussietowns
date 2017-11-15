using System;
using System.Text;
using FunWithLocal.WebApi;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AussieTowns.Auth
{
    public class TokenAuthOption
    {
        public static string Audience { get; } = "https://www.funwithlocal.com";
        public static string Issuer { get; } = "www.funwithlocal.com";
        public static string SecretSigningKey { get; } = "VK9zTN5FkiP2m64uvi/duNGrv2dQ6P+zmjcqAsIESa13t50cCgx1xPiDYm9b1HHBl4rENn7ErnsE/8BEnkRzTclppR81vJGopzchNtlLaF3C5MTa0aCpk8FXaZphVIebNWBCBJTildvNgtF11RUD6E3TzPfdnnbwBns61oglQzw=";
        //public static RsaSecurityKey Key { get; } = new RsaSecurityKey(RSAKeyHelper.GenerateKey());
        public static SecurityKey Key { get; } = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretSigningKey));
        public static SigningCredentials SigningCredentials { get; } = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256Signature);

        public static TimeSpan ExpiresSpan { get; } = TimeSpan.FromDays(30);
        public static string TokenType { get; } = "Bearer";
    }
}
