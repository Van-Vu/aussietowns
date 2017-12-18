using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using FunWithLocal.WebApi.Auth;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Extensions;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using FunWithLocal.WebApi.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Wangkanai.Detection;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FunWithLocal.WebApi.Controllers
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
        private readonly ISecurityTokenService _securityTokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppSettings _appSettings;
        private readonly IImageService _imageService;
        private readonly IImageStorageService _imageStorageService;
        private readonly IDevice _device;

        public UserController(IUserService userService, IEmailService emailService, IHostingEnvironment hostingEnv, 
            IMapper mapper, ILogger<UserController> logger, IAuthorizationService authorizationService,
            ISecurityTokenService securityTokenService, IHttpContextAccessor httpContextAccessor,
            IOptions<AppSettings> appSettings, IImageService imageService,
            IImageStorageService imageStorageService, IDeviceResolver deviceResolver)
        {
            _userService = userService;
            _emailService = emailService;
            _hostingEnv = hostingEnv;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _securityTokenService = securityTokenService;
            _httpContextAccessor = httpContextAccessor;
            _imageService = imageService;
            _imageStorageService = imageStorageService;
            _appSettings = appSettings.Value;
            _device = deviceResolver.Device;
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
                if (userId <= 1) throw new ArgumentOutOfRangeException(nameof(user), "Can't register user");

                user.Id = userId;
                var expiresIn = DateTime.Now + TokenAuthOption.ExpiresSpan;
                var userInfo = $"{user.Id}|{user.Email}|{expiresIn.Ticks}";
                var confirmEmailToken = $"{Request.Headers["Access-Control-Allow-Origin"]}/confirmemail/{_securityTokenService.Encrypt(userInfo)}";
                    
                await _emailService.SendWelcomeEmail(new WelcomeEmailViewModel{EmailConfirmationToken = confirmEmailToken},  user.Email);

                return new
                {
                    accessToken = _securityTokenService.CreateTokenString(user, expiresIn),
                    loggedInUser = _mapper.Map<User, UserLoggedIn>(user, opts => opts.BeforeMap((x, y) =>
                    {
                        x.TransformImageUrls(_imageStorageService, _device);
                        x.Images = _imageStorageService.TransformImageUrls(x.Images, ImageType.UserProfile, _device);
                        x.HeroImageUrl = _imageStorageService.GetCloudinaryImageUrl(ImageType.UserHeroImage, _device, x.HeroImageUrl);
                    }))
                };
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

        [HttpGet("verifyToken/{token}")]
        public async Task<UserResponse> VerifyEmailtoken(string token)
        {
            try
            {
                var user = await GetUserInfoFromToken(token);

                if (user == null) throw new ArgumentNullException(nameof(token));

                return _mapper.Map<User, UserResponse>(user
                    , opts => opts.BeforeMap((x, y) =>
                    {
                        x.TransformImageUrls(_imageStorageService, _device);
                        x.Images = _imageStorageService.TransformImageUrls(x.Images, ImageType.UserProfile, _device);
                        x.HeroImageUrl = _imageStorageService.GetCloudinaryImageUrl(ImageType.UserHeroImage, _device, x.HeroImageUrl);
                    }));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                _logger.LogInformation("Can't verify token: {tokenString}", token);
                throw new ValidationException("Token is incorrect");
            }
        }

        [HttpPost("confirm")]
        public async Task<dynamic> Confirm([FromBody] User user)
        {
            try
            {
                var existingUser = await GetUserInfoFromToken(user.Token);

                if (existingUser == null) throw new ArgumentNullException(nameof(user));

                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.IsConfirm = true;
                var updatedStatus = await _userService.Update(existingUser);

                return updatedStatus;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                _logger.LogInformation("Can't confirm this user: {user}", user);
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

                if (files == null || files.Count > 1) throw new ArgumentNullException(nameof(files));
                var file = files.FirstOrDefault();
                if (file != null && file.Length <= 0) throw new ArgumentNullException(nameof(file));

                var newImageUrl = await _imageService.InsertProfileImage(id, file);

                return !string.IsNullOrEmpty(newImageUrl) ? newImageUrl : string.Empty;
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

                if (files == null || files.Count > 1) throw new ArgumentNullException(nameof(files));
                var file = files.FirstOrDefault();
                if (file != null && file.Length <= 0) throw new ArgumentNullException(nameof(file));

                var newImageUrl = await _imageService.InsertHeroImage(id, file);

                return !string.IsNullOrEmpty(newImageUrl) ? newImageUrl : string.Empty;
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

                return _mapper.Map<User, UserResponse>(user
                    ,opts => opts.BeforeMap((x, y) =>
                    {
                        x.TransformImageUrls(_imageStorageService, _device);
                        x.Images = _imageStorageService.TransformImageUrls(x.Images,ImageType.UserProfile, _device);
                        x.HeroImageUrl = _imageStorageService.GetCloudinaryImageUrl(ImageType.UserHeroImage, _device,x.HeroImageUrl);
                    }));
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

        [HttpGet("verifyEmail/{email}")]
        //[Authorize(Policy = "AtLeastEditor")]
        public async Task<bool> VerifyEmail(string email)
        {
            try
            {
                var user = await _userService.GetByEmail(email);
                //true: good to go ahead
                return user == null;
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

        private async Task<dynamic> GenerateToken(User user)
        {
            var expiresIn = DateTime.Now + TokenAuthOption.ExpiresSpan;
            var token = _securityTokenService.CreateTokenString(user, expiresIn);

            //var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Email, user.Email)
            //};

            //var userIdentity = new ClaimsIdentity(claims, "login");

            //ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            //await HttpContext.SignInAsync(principal);


            return new 
            {
                accessToken = token,
                loggedInUser = _mapper.Map<User,UserLoggedIn>(user, opts => opts.BeforeMap((x, y) =>
                {
                    x.TransformImageUrls(_imageStorageService, _device);
                    x.Images = _imageStorageService.TransformImageUrls(x.Images, ImageType.UserProfile, _device);
                    x.HeroImageUrl = _imageStorageService.GetCloudinaryImageUrl(ImageType.UserHeroImage, _device, x.HeroImageUrl);
                }))
            };
        }

        private async Task<User> GetUserInfoFromToken(string token)
        {
            var decryptText = _securityTokenService.Decrypt(token);

            var userInfo = decryptText.Split('|');
            if (userInfo.Length == 3)
            {
                var expiryTime = Convert.ToInt64(userInfo[2]);
                if (DateTime.Now.Ticks <= expiryTime)
                {
                    var userId = Convert.ToInt32(userInfo[0]);
                    var email = userInfo[1];

                    if (userId > 0)
                    {
                        return await _userService.GetByIdAndEmail(userId, email);
                    }
                }
            }

            return null;
        }
    }
}

