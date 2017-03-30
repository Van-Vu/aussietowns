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
using AussieTowns.Model;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Remotion.Linq.Clauses.ExpressionVisitors;

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
        public object Register([FromBody] User user)
        {
            var a = string.Empty;
            try
            {
                _userService.Register(user);
                return GenerateToken(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("login")]
        public object Login([FromBody] User user)
        {
            try
            {
                var existedUser = _userService.GetByEmailAndPassword(user.Email, user.Password);
                if (existedUser != null)
                {
                    return GenerateToken(existedUser);
                }
                else
                {
                    return JsonConvert.SerializeObject(new RequestResult
                    {
                        State = RequestState.Failed,
                        Msg = "Username or password is invalid"
                    });
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("info/{id}")]
        [Authorize("Bearer")]
        public string GetUserInfo(int id)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            if (claimsIdentity == null)
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Can't find user"
                });
            
            //var userId = Convert.ToInt32(claimsIdentity.Claims.FirstOrDefault(x=>x.Type=="userId")?.Value);
            //var email = claimsIdentity.Name;
            var user = _userService.GetById(id);
            if (user!= null)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = user?.Result
                });
            }

            return JsonConvert.SerializeObject(new RequestResult
            {
                State = RequestState.Failed,
                Msg = "Can't find user"
            });
        }

        [HttpGet("search")]
        public string SearchUser([FromQuery]string term)
        {
            try
            {
                var availableUsers = _userService.SearchUsers(term);
                if (availableUsers?.Count > 0)
                {
                    return JsonConvert.SerializeObject(new RequestResult
                    {
                        State = RequestState.Success,
                        Data = availableUsers.Select(user => _mapper.Map<User, MiniProfile>(user))
                    });
                }

                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Data = null
                });

            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Data = "Something is wrong: " + ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        [Authorize("Bearer")]
        public string Update(int id,[FromBody] User userRequest)
        {
            try
            {
                _userService.Update(userRequest);
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Success,
                    Msg = "Update successful"
                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new RequestResult
                {
                    State = RequestState.Failed,
                    Msg = "Update failed:" + ex.Message
                });
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

        private string GenerateToken(User user)
        {
            var requestAt = DateTime.Now;
            var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
            var token = GenerateToken(user, expiresIn);

            return JsonConvert.SerializeObject(new RequestResult
            {
                State = RequestState.Success,
                Data = new
                {
                    requestAt = requestAt,
                    expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                    tokeyType = TokenAuthOption.TokenType,
                    accessToken = token,
                    username = user.FirstName,
                    userId = user.Id
                }
            });
        }

        private string GenerateToken(User user, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(user.Email, "TokenAuth"),
                new[] {
                    new Claim("userId", user.Id.ToString())
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
