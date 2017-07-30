using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AussieTowns.Auth;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Repository;
using AussieTowns.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Sinks.RollingFile;


namespace AussieTowns
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

            var jsonSink = new RollingFileSink(@"meeththelocal-{Date}.json", new JsonFormatter(), 104857600, null);
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

            // Add framework services with JSON loop ignore: http://stackoverflow.com/a/38382021/1284688
            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                );

            services.AddAutoMapper();

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

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AtLeastUser", policy => policy.RequireRole(((int)UserRole.User).ToString(), ((int)UserRole.Editor).ToString(), ((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
                options.AddPolicy("AtLeastEditor", policy => policy.RequireRole(((int)UserRole.Editor).ToString(), ((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
                options.AddPolicy("AtLeastAdmin", policy => policy.RequireRole(((int)UserRole.Admin).ToString(), ((int)UserRole.SuperAdmin).ToString()));
                options.AddPolicy("SuperAdmin", policy => policy.RequireRole(((int)UserRole.SuperAdmin).ToString()));
            });

            //Use a MySQL database
            var mySqlConnectionString = Configuration.GetConnectionString("DataAccessMySqlProvider");

            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<ISearchService, SearchService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IListingService, ListingService>();
            services.AddTransient<IMessageService, MessageService>();

            // Bodom: resolve service in ConfigureServices
            var serviceProvider = services.BuildServiceProvider();

            services.AddTransient<ILocationRepository, LocationRepository>(x => new LocationRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<LocationRepository>>()));
            services.AddTransient<IUserRepository, UserRepository>(x => new UserRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<UserRepository>>()));
            services.AddTransient<IListingRepository, ListingRepository>(x => new ListingRepository(mySqlConnectionString, serviceProvider.GetService<ILogger<ListingRepository>>()));
            services.AddTransient<IMessageRepository, MessageRepository>(x => new MessageRepository(mySqlConnectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
        {
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            loggerFactory.AddSerilog();

            // Ensure any buffered events are sent at shutdown
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            #region Handle Exception 
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;

                    // Bodom: have to manually push this to response stream otherwise client will receive response=undefined
                    context.Response.Headers.Add("Access-Control-Allow-Origin", context.Request.Headers["Access-Control-Allow-Origin"]);
                    context.Response.Headers.Add("Access-Control-Allow-Credentials", context.Request.Headers["Access-Control-Allow-Credentials"]);
                    context.Response.Headers.Add("Access-Control-Allow-Headers", context.Request.Headers["Access-Control-Allow-Headers"]);

                    if (error != null && (error.Error is ArgumentNullException || error.Error is ValidationException))
                    {
                        context.Response.StatusCode = 401;
                    }
                    else if (error?.Error is SecurityTokenExpiredException)
                    {
                        context.Response.StatusCode = 401;
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

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                AuthenticationScheme = "Cookie",
                CookieName = "mtltk",
                Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = async (context) => context.Response.StatusCode = 401,
                    OnRedirectToAccessDenied = async (context) => context.Response.StatusCode = 403
                },
                TicketDataFormat = new CustomJwtDataFormat(
                    SecurityAlgorithms.RsaSha256Signature,
                    tokenValidationParameters)
            });



            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

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
