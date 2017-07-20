using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IHostingEnvironment _hostingEnv;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IHostingEnvironment hostingEnv, IMapper mapper)
        {
            _userService = userService;
            _hostingEnv = hostingEnv;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<RequestResult> Register([FromBody] User user)
        {
            try
            {
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

                await _userService.Register(user);
                return GenerateToken(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("login")]
        public async Task<RequestResult> Login([FromBody] User user)
        {
            try
            {
                var existingUser = (await _userService.SearchUser(user.Email)).FirstOrDefault();

                if (user.Source == UserSource.Native)
                {
                    var realPassword = user.Password.RsaDecrypt();
                    var passwordHash = (realPassword + existingUser.Salt).GetHash();

                    if (passwordHash == existingUser.Password)
                    {
                        return GenerateToken(existingUser);
                    }
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


                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Username or password is invalid"
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("{id}")]
        //[Authorize("Bearer")]
        public async Task<RequestResult> GetUserInfo(int id)
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                if (claimsIdentity == null)
                    return new RequestResult
                    {
                        State = RequestState.Failed,
                        Msg = "Can't find user"
                    };

                //var userId = Convert.ToInt32(claimsIdentity.Claims.FirstOrDefault(x=>x.Type=="userId")?.Value);
                //var email = claimsIdentity.Name;
                var user = await _userService.GetById(id);
                if (user != null)
                {
                    return new RequestResult
                    {
                        State = RequestState.Success,
                        Data = _mapper.Map<User, UserResponse>(user)
                    };
                }

                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Can't find user"
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("summary/{id}")]
        [Authorize(Policy = "AtLeastEditor")]
        public async Task<RequestResult> GetUserMiniProfile(int id)
        {
            var user = await _userService.GetById(id);
            if (user != null)
            {
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = _mapper.Map<User,MiniProfile>(user) 
                };
            }

            return new RequestResult
            {
                State = RequestState.Failed,
                Msg = "Can't find user"
            };
        }


        [HttpGet("search")]
        public async Task<RequestResult> SearchUser([FromQuery]string term)
        {
            try
            {
                var availableUsers = await _userService.SearchUser(term);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Data = availableUsers.Select(user => _mapper.Map<User, MiniProfile>(user))
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Something is wrong: " + ex.Message
                };
            }
        }

        [HttpGet("autocomplete")]
        public async Task<IEnumerable<AutoCompleteItem>> GetAutocomplete([FromQuery] string search)
        {
            return (await _userService.SearchUser(search)).Select(user => _mapper.Map<User, AutoCompleteItem>(user));
        }

        [HttpPut("{id}")]
        //[Authorize("Bearer")]
        public async Task<RequestResult> Update(int id,[FromBody] Model.Profile profile)
        {
            try
            {
                await _userService.Update(profile);
                return new RequestResult
                {
                    State = RequestState.Success,
                    Msg = "Update successful"
                };
            }
            catch (Exception ex)
            {
                return new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Update failed:" + ex.Message
                };
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

        private RequestResult GenerateToken(User user)
        {
            var requestAt = DateTime.Now;
            var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
            var token = GenerateToken(user, expiresIn);

            return new RequestResult
            {
                State = RequestState.Success,
                Data = new
                {
                    requestAt = requestAt,
                    expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                    tokeyType = TokenAuthOption.TokenType,
                    accessToken = token,
                    loggedInUser = _mapper.Map<User,UserLoggedIn>(user)
                }
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
