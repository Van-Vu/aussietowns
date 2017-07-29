using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ThirdParty.BouncyCastle.OpenSsl;


namespace AussieTowns.Controllers
{
    // https://stackoverflow.com/questions/17128038/c-sharp-rsa-encryption-decryption-with-transmission
    // https://stackoverflow.com/questions/23734792/c-sharp-export-private-public-rsa-key-from-rsacryptoserviceprovider-to-pem-strin
    // https://stackoverflow.com/questions/14037204/import-net-public-xml-key-to-javascript-in-rsa
    // https://gist.github.com/fmoliveira/42af375804e0cd3add8d
    // https://github.com/jrnker/CSharp-easy-RSA-PEM
    // https://www.example-code.com/dotnet-core/rsa_keyExchange.asp
    // https://www.codeproject.com/Articles/1104467/Hashing-passwords-in-NET-Core-with-tips
    [Route("api/[controller]")]
    public class AuthController
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("verify")]
        public async Task<JsonResult> VerifyResetToken(string token)
        {
            var user = await _userService.VerifyResetToken(token);

            if (user == null)
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }
            else
            {
                return new JsonResult(user.FirstName);
            }
        }

        [HttpPost("requestreset")]
        public async Task<JsonResult> RequestPasswordReset([FromBody] ResetRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email))
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }


            var user = (await _userService.SearchUser(request.Email)).FirstOrDefault();

            if (user == null)
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }

            var reset = _userService.RequestPasswordReset(user.Id);

            return new JsonResult(reset);
        }

        [HttpPost("resetpassword")]
        public async Task<JsonResult> ResetPassword([FromBody] PasswordReset request)
        {
            if (string.IsNullOrEmpty(request?.ResetToken) || request.IsChangePassword)
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }

            var user = await _userService.VerifyResetToken(request.ResetToken);

            if (user == null)
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }

            var realPassword = user.Password.RsaDecrypt();
            user.Salt = Sha512Hashing.GetSalt();
            user.Password = (realPassword + user.Salt).GetHash();
            user.UpdatedDate = DateTime.Now;

            var reset = _userService.UpdatePassword(user, request.IsChangePassword);

            return new JsonResult(reset);
        }

        [HttpPost("changepassword")]
        public async Task<JsonResult> ChangePassword([FromBody] PasswordReset request)
        {
            if ((!request.IsChangePassword) || (request.OldPassword != request.NewPassword))
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }

            var existingUser = (await _userService.SearchUser(request.Email)).FirstOrDefault();

            if (existingUser == null)
            {
                return new JsonResult("hey mate, what you're trying to do? Send me an email then we can sort this out. Peace");
            }

            var oldPassword = request.OldPassword.RsaDecrypt();
            var oldPasswordHash = (oldPassword + existingUser.Salt).GetHash();

            if (oldPasswordHash == existingUser.Password)
            {
                var realPassword = request.NewPassword.RsaDecrypt();
                existingUser.Salt = Sha512Hashing.GetSalt();
                existingUser.Password = (realPassword + existingUser.Salt).GetHash();
                existingUser.UpdatedDate = DateTime.Now;
                existingUser.Source = UserSource.Native;

                var reset = await _userService.UpdatePassword(existingUser, request.IsChangePassword);

                return new JsonResult(reset);
            }

            return new JsonResult(string.Empty);
        }
    }
}
