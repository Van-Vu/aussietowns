using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading.Tasks;
using AussieTowns.Auth;
using AussieTowns.Repository;
using AussieTowns.Services;
using AutoMapper;
using FunWithLocal.WebApi.Repository;
using FunWithLocal.WebApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RazorLight;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Sinks.RollingFile;

namespace FunWithLocal.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("config.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            //Log.Logger = new LoggerConfiguration()
            //    .ReadFrom.Configuration(Configuration)
            //    .CreateLogger();

            var jsonSink = new RollingFileSink(@"..\logs\netcore\{Date}.json", new JsonFormatter(), 104857600, null);
            if (env.IsDevelopment())
            {
                Log.Logger = new LoggerConfiguration()
                    .Enrich.FromLogContext()
                    .MinimumLevel.Information()
                    .WriteTo.Sink(jsonSink)
                    .CreateLogger();
            }
            else
            {
                Log.Logger = new LoggerConfiguration()
                    .Enrich.FromLogContext()
                    .MinimumLevel.Error()
                    .WriteTo.Sink(jsonSink)
                    .CreateLogger();
            }
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = TokenAuthOption.Key,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = TokenAuthOption.Issuer,

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = TokenAuthOption.Audience,

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            // https://stackoverflow.com/questions/38795103/encrypt-string-in-net-core
            services.AddDataProtection();

            // Add framework services with JSON loop ignore: http://stackoverflow.com/a/38382021/1284688
            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                );

            services.AddAutoMapper();

            // Bodom: resolve service in ConfigureServices
            var serviceProvider = services.BuildServiceProvider();

            var serialiser = serviceProvider.GetService<IDataSerializer<AuthenticationTicket>>();
            // this is one way to get a data protector instance
            var dataProtector = serviceProvider.GetDataProtector(new string[] { "fwl-Auth" });

            services.AddAuthentication("mtltk")
                    .AddCookie("mtltk", options =>
                    {
                        options.Cookie = new CookieBuilder
                        {
                            //Domain = "",
                            HttpOnly = true,
                            Name = "mtltk",
                            Path = "/",
                            SameSite = SameSiteMode.Lax,
                            SecurePolicy = CookieSecurePolicy.SameAsRequest
                        };
                        options.Events = new CookieAuthenticationEvents
                        {
                            OnRedirectToLogin = async (context) => context.Response.StatusCode = 401,
                            OnRedirectToAccessDenied = async (context) => context.Response.StatusCode = 403,
                            OnSignedIn = context =>
                            {
                                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                                  "OnSignedIn", context.Principal.Identity.Name);
                                return Task.CompletedTask;
                            },
                            OnSigningOut = context =>
                            {
                                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                                  "OnSigningOut", context.HttpContext.User.Identity.Name);
                                return Task.CompletedTask;
                            },
                            OnValidatePrincipal = context =>
                            {
                                Console.WriteLine("{0} - {1}: {2}", DateTime.Now,
                                  "OnValidatePrincipal", context.Principal.Identity.Name);
                                return Task.CompletedTask;
                            }
                        };
                        //options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
                        options.LoginPath = new PathString("/Security/Login");
                        options.ReturnUrlParameter = "RequestPath";
                        options.SlidingExpiration = true;
                        options.TicketDataFormat = new CustomJwtDataFormat(
                            SecurityAlgorithms.RsaSha256Signature,
                            tokenValidationParameters, serialiser,
                                                  dataProtector);
                    });



            // Enable the use of an [Authorize("Bearer")] attribute on methods and classes to protect.
            //services.AddAuthorization(auth =>
            //{
            //    auth.AddPolicy("Bearer",
            //      policy =>
            //      {
            //          policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser();
            //      });
            //});

            //services.Configure<IdentityOptions>(options =>
            //{
            //    options.Cookies.ApplicationCookie.LoginPath = new PathString("/");
            //    options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
            //    {
            //        OnRedirectToLogin = context =>
            //        {
            //            if (context.Request.Path.Value.StartsWith("/api"))
            //            {
            //                context.Response.Clear();
            //                context.Response.StatusCode = 401;
            //                return Task.FromResult(0);
            //            }
            //            context.Response.Redirect(context.RedirectUri);
            //            return Task.FromResult(0);
            //        }
            //    };
            //});

            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("AtLeastUser", policy => policy.RequireRole(((int)UserRole.User).ToString(), ((int)UserRole.Editor).ToString(), ((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
            //    options.AddPolicy("AtLeastEditor", policy => policy.RequireRole(((int)UserRole.Editor).ToString(), ((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
            //    options.AddPolicy("AtLeastAdmin", policy => policy.RequireRole(((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
            //    options.AddPolicy("SuperAdmin", policy => policy.RequireRole(((int)UserRole.SuperAdmin).ToString()));
            //});

            //Use a MySQL database
            var mySqlConnectionString = Configuration.GetValue<string>("FwlSettings:MySqlConnString");

            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("FwlSettings"));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IRazorLightEngine>(f => new EngineFactory()
                .ForFileSystem($"{Directory.GetCurrentDirectory()}\\Content\\EmailTemplates"));

            services.AddTransient<ISearchService, SearchService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IListingService, ListingService>();
            services.AddTransient<IMessageService, MessageService>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<ISecurityTokenService, SecurityTokenService>();
            

            services.AddTransient<ILocationRepository, LocationRepository>(x => new LocationRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<LocationRepository>>()));
            services.AddTransient<IUserRepository, UserRepository>(x => new UserRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<UserRepository>>()));
            services.AddTransient<IListingRepository, ListingRepository>(x => new ListingRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<ListingRepository>>()));
            services.AddTransient<IImageRepository, ImageRepository>(x => new ImageRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<ImageRepository>>()));
            services.AddTransient<IMessageRepository, MessageRepository>(x => new MessageRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<MessageRepository>>()));
            services.AddTransient<IEmailLogRepository, EmailLogRepository>(x => new EmailLogRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<EmailLogRepository>>()));
            services.AddTransient<IBookingRepository, BookingRepository>(x => new BookingRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<BookingRepository>>()));

            services.AddSingleton<IAuthorizationHandler, ListingAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ProfileAuthorizationHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
        {
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            loggerFactory.AddSerilog();

            // Ensure any buffered events are sent at shutdown
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            //    {
            //        HotModuleReplacement = true
            //    });
            //}
            //else
            //{
            //    app.UseExceptionHandler("/Home/Error");
            //}

            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = true
            });

            //app.UseStaticFiles();

            #region Handle Exception 
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;

                    // Bodom: have to manually push this to response stream otherwise client will receive response=undefined
                    context.Response.Headers.Add("Access-Control-Allow-Origin", context.Request.Headers["Access-Control-Allow-Origin"]);
                    context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");

                    // Bodom: refactor this to Switch
                    if (error != null && (error.Error is ArgumentNullException || error.Error is ValidationException))
                    {
                        context.Response.StatusCode = 400;
                    }
                    else if (error?.Error is SecurityTokenExpiredException)
                    {
                        context.Response.StatusCode = 401;
                    }
                    else if (error?.Error is UnauthorizedAccessException)
                    {
                        context.Response.StatusCode = 403;
                    }
                    else if (error != null && (error?.Error is ArgumentOutOfRangeException || error.Error is KeyNotFoundException))
                    {
                        context.Response.StatusCode = 404;
                    }
                    else if (error?.Error != null)
                    {
                        context.Response.StatusCode = 500;
                    }
                    else await next();

                    if (error?.Error != null)
                    {
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(error.Error.Message);
                    }
                });
            });
            #endregion

            #region UseJwtBearerAuthentication
            //app.UseJwtBearerAuthentication(new JwtBearerOptions()
            //{
            //    TokenValidationParameters = new TokenValidationParameters()
            //    {
            //        IssuerSigningKey = TokenAuthOption.Key,
            //        ValidAudience = TokenAuthOption.Audience,
            //        ValidIssuer = TokenAuthOption.Issuer,
            //        // When receiving a token, check that we've signed it.
            //        ValidateIssuerSigningKey = true,
            //        // When receiving a token, check that it is still valid.
            //        ValidateLifetime = true,
            //        // This defines the maximum allowable clock skew - i.e. provides a tolerance on the token expiry time 
            //        // when validating the lifetime. As we're creating the tokens locally and validating them on the same 
            //        // machines which should have synchronised time, this can be set to zero. Where external tokens are
            //        // used, some leeway here could be useful.
            //        ClockSkew = TimeSpan.FromMinutes(0)
            //    }
            //});
            #endregion

            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

            //.net core 2.0
            app.UseAuthentication();

            // Handle Lets Encrypt Route (before MVC processing!)
            app.UseRouter(r =>
            {
                r.MapGet(".well-known/acme-challenge/{id}", async (request, response, routeData) =>
                {
                    var id = routeData.Values["id"] as string;
                    var file = Path.Combine(env.WebRootPath, ".well-known", "acme-challenge", id);
                    await response.SendFileAsync(file);
                });
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
