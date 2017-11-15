using System;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Services;
using FunWithLocal.WebApi.Services;
using FunWithLocal.WebApi.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace FunWithLocal.WebApi.Controllers
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
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserService userService, IEmailService emailService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpGet("verify")]
        public async Task<string> VerifyResetToken(string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token)) throw new ArgumentNullException(nameof(token));
                var user = await _userService.VerifyResetToken(token);
                if (user == null)
                {
                    _logger.LogError("Reset token invalid: {token}", token);
                    throw new SecurityTokenExpiredException("Invalid Token");
                }


                return user.FirstName;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }

        [HttpPost("requestreset")]
        public async Task<int> RequestPasswordReset([FromBody] ResetRequest request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException(nameof(request));
                if (string.IsNullOrEmpty(request.Email))
                {
                    throw new ArgumentNullException(nameof(request), "Email is required");
                }


                var user = (await _userService.SearchUser(request.Email)).FirstOrDefault();

                if (user == null)
                {
                    _logger.LogInformation("Can't find user with email: {email}", request.Email);
                    throw new ArgumentOutOfRangeException(nameof(request), "Invalid Request");
                }

                var token = Guid.NewGuid().ToString();
                var resetLink = $"https://www.funwithlocal.com/resetpassword/{token}";

                await _emailService.SendResetPasswordEmail(new ResetPasswordEmailViewModel { ResetLink = resetLink }, request.Email);

                var reset = await _userService.RequestPasswordReset(user.Id, token, DateTime.Today.AddDays(2));

                return reset;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }

        }

        [HttpPost("resetpassword")]
        public async Task<int> ResetPassword([FromBody] PasswordReset request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException(nameof(request));

                if (string.IsNullOrEmpty(request.ResetToken) || request.IsChangePassword)
                {
                    throw new SecurityTokenExpiredException("Invalid Token");
                }

                var user = await _userService.VerifyResetToken(request.ResetToken);
                if (user == null)
                {
                    _logger.LogError("Reset token invalid: {request.ResetToken}", request.ResetToken);
                    throw new SecurityTokenExpiredException("Invalid Token");
                }

                var realPassword = request.NewPassword.RsaDecrypt();
                user.Salt = Sha512Hashing.GetSalt();
                user.Password = (realPassword + user.Salt).GetHash();
                user.UpdatedDate = DateTime.Now;

                var reset = await _userService.UpdatePassword(user, request.IsChangePassword);

                return reset;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }

        [HttpPost("changepassword")]
        public async Task<int> ChangePassword([FromBody] PasswordReset request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException(nameof(request));

                if (!request.IsChangePassword || (request.OldPassword == request.NewPassword))
                {
                    throw new ArgumentOutOfRangeException(nameof(request), "Invalid Request");
                }

                var existingUser = (await _userService.SearchUser(request.Email)).FirstOrDefault();

                if (existingUser == null)
                {
                    _logger.LogInformation("Can't find user with email {email}", request.Email);
                    throw new ArgumentOutOfRangeException(nameof(request), "Invalid Request");
                }

                var oldPassword = request.OldPassword.RsaDecrypt();
                var oldPasswordHash = (oldPassword + existingUser.Salt).GetHash();

                if (oldPasswordHash != existingUser.Password)
                {
                    _logger.LogInformation("user {email}: oldPassword {oldPassword} is invalid", request.Email, request.OldPassword);
                    throw new ArgumentOutOfRangeException(nameof(request), "Invalid Request");
                }

                var newPassword = request.NewPassword.RsaDecrypt();
                existingUser.Salt = Sha512Hashing.GetSalt();
                existingUser.Password = (newPassword + existingUser.Salt).GetHash();
                existingUser.UpdatedDate = DateTime.Now;
                existingUser.Source = UserSource.Native;

                var reset = await _userService.UpdatePassword(existingUser, request.IsChangePassword);

                return reset;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message,e);
                throw;
            }
        }
    }
}
