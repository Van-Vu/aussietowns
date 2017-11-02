using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IHostingEnvironment _hostingEnv;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly AppSettings _appSettings;
        private readonly IImageService _imageService;

        public UserController(IUserService userService, IEmailService emailService, IHostingEnvironment hostingEnv, IMapper mapper, ILogger<UserController> logger, IAuthorizationService authorizationService, IOptions<AppSettings> appSettings, IImageService imageService)
        {
            _userService = userService;
            _emailService = emailService;
            _hostingEnv = hostingEnv;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _imageService = imageService;
            _appSettings = appSettings.Value;
        }

        [HttpPost("register")]
        public async Task<dynamic> Register([FromBody] User user)
        {
            try
            {
                if (user == null) throw new ArgumentNullException(nameof(user));

                if (user.Source == UserSource.Native)
                {
                    var realPassword = user.Password.RsaDecrypt();
                    user.Salt = Sha512Hashing.GetSalt();
                    user.Password = (realPassword + user.Salt).GetHash();
                }
                else
                {
                    user.ExternalId = user.ExternalId.RsaDecrypt();
                }

                var userId = await _userService.Register(user);
                if (userId > 1)
                {
                    await _emailService.SendWelcomeEmail(user.Email);
                    user.Id = userId;
                    return GenerateToken(user);
                }

                throw new ArgumentOutOfRangeException(nameof(user), "Can't register user");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("login")]
        public async Task<dynamic> Login([FromBody] User user)
        {
            try
            {
                if (user.Source == UserSource.Native && (string.IsNullOrEmpty(user?.Email) || string.IsNullOrEmpty(user.Password)))
                    throw new ArgumentNullException(nameof(user));

                var existingUser = (await _userService.SearchUser(user.Email)).FirstOrDefault();

                if (existingUser == null)
                {
                    _logger.LogInformation("Can't find user with email: {email}", user.Email);
                    throw new ValidationException("Email or Password is incorrect");
                }


                if (user.Source == UserSource.Native)
                {
                    var realPassword = user.Password.RsaDecrypt();
                    var passwordHash = (realPassword + existingUser.Salt).GetHash();

                    if (passwordHash == existingUser.Password)
                    {
                        return GenerateToken(existingUser);
                    }
                    _logger.LogInformation("{email} Old password is incorrect", user.Email);
                    throw new ValidationException("Email or Password is incorrect");
                }
                else
                {
                    if (user.Email == existingUser.Email 
                        && user.Source == existingUser.Source 
                        && user.ExternalId.RsaDecrypt() == existingUser.ExternalId)
                    {
                        return GenerateToken(existingUser);
                    }
                }

                throw new ValidationException("Email or Password is incorrect");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{id}/addImage")]
        public async Task<string> UploadProfileImage(int id, IList<IFormFile> files)
        {
            try
            {
                //if (listingId < 100000 || listingId > 1000000) throw new ValidationException(nameof(listingId));
                if (!(await _authorizationService.AuthorizeAsync(User, new User { Id = id }, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        // Bodom hack: deal with this later
                        var result = await AwsS3Extensions.SaveToS3Async(
                            AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                                _appSettings.AwsS3Region),
                            file.OpenReadStream(), "meetthelocal-development", $"images/profiles/{id}/{file.FileName}");

                        var imageUrl = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/images/profiles/{id}/{file.FileName}";
                        var uploadResult = await _imageService.InsertProfileImage(id, imageUrl);

                        if (uploadResult >= 1)
                        {
                            return imageUrl;
                        }

                        throw new ArgumentNullException(nameof(files));
                    }
                }

                throw new ArgumentNullException(nameof(files));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpPost("{id}/addHeroImage")]
        public async Task<string> UploadHeroImage(int id, IList<IFormFile> files)
        {
            try
            {
                //if (listingId < 100000 || listingId > 1000000) throw new ValidationException(nameof(listingId));
                if (!(await _authorizationService.AuthorizeAsync(User, new User { Id = id }, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                foreach (var file in files)
                {
                    if (file.Length <= 0) throw new ArgumentNullException(nameof(files));

                    // Bodom hack: deal with this later
                    var result = await AwsS3Extensions.SaveToS3Async(
                        AwsS3Extensions.GetS3Client(_appSettings.AwsS3SecretKey, _appSettings.AwsS3AccessKey,
                            _appSettings.AwsS3Region),
                        file.OpenReadStream(), "meetthelocal-development", $"images/profiles/{id}/{file.FileName}");

                    var imageUrl = $"https://s3-ap-southeast-2.amazonaws.com/meetthelocal-development/images/profiles/{id}/{file.FileName}";
                    var uploadResult = await _imageService.InsertHeroImage(id, imageUrl);

                    if (uploadResult == 1)
                    {
                        return imageUrl;
                    }

                    throw new ArgumentNullException(nameof(files));
                }

                throw new ArgumentNullException(nameof(files));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("{userId}")]
        public async Task<UserResponse> GetUserInfo(int userId)
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                if (claimsIdentity == null)
                {
                    _logger.LogError("Unauthorized access {userId}", userId);
                    throw new UnauthorizedAccessException();
                }
                    

                //var userId = Convert.ToInt32(claimsIdentity.Claims.FirstOrDefault(x=>x.Type=="userId")?.Value);
                //var email = claimsIdentity.Name;
                var user = await _userService.GetById(userId);

                if (user == null) throw new ArgumentNullException(nameof(userId));

                return _mapper.Map<User,UserResponse>(user);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("summary/{id}")]
        //[Authorize(Policy = "AtLeastEditor")]
        public async Task<MiniProfile> GetUserMiniProfile(int id)
        {
            try
            {
                var user = await _userService.GetById(id);
                if (user != null)
                {
                    return _mapper.Map<User, MiniProfile>(user);
                }

                return null;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }


        [HttpGet("search")]
        public async Task<IEnumerable<MiniProfile>> SearchUser([FromQuery]string term)
        {
            try
            {
                var availableUsers = await _userService.SearchUser(term);
                return availableUsers.Select(user => _mapper.Map<User, MiniProfile>(user));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        [HttpGet("autocomplete")]
        public async Task<IEnumerable<AutoCompleteItem>> GetAutocomplete([FromQuery] string search)
        {
            return (await _userService.SearchUser(search)).Select(user => _mapper.Map<User, AutoCompleteItem>(user));
        }

        [HttpPut("{id}")]
        //[Authorize("Bearer")]
        public async Task<int> Update(int id,[FromBody] User user)
        {
            try
            {
                if (!(await _authorizationService.AuthorizeAsync(User, user, Operations.Update)).Succeeded)
                    throw new UnauthorizedAccessException();

                return await _userService.Update(user);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }
        
        [HttpPost("profileimage")]
        public async Task<ActionResult> Post(IFormFile file)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    var savePath = Path.Combine(_hostingEnv.WebRootPath, "uploads", file.FileName);

                    using (var fileStream = new FileStream(savePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    return Created(savePath, file);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private dynamic GenerateToken(User user)
        {
            var expiresIn = DateTime.Now + TokenAuthOption.ExpiresSpan;
            var token = GenerateToken(user, expiresIn);

            return new 
            {
                expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                tokeyType = TokenAuthOption.TokenType,
                accessToken = token,
                loggedInUser = _mapper.Map<User,UserLoggedIn>(user)
            };
        }

        private string GenerateToken(User user, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

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
    }
}
