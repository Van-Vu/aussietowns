using System;
using AussieTowns.Common;
using AussieTowns.Extensions;
using AussieTowns.Model;
using AussieTowns.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Services;
using FunWithLocal.WebApi.ViewModel;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Newtonsoft.Json;
using Wangkanai.Detection;

namespace FunWithLocal.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class TestController: Controller
    {
        private readonly ILogger _logger;
        private readonly ISearchService _searchService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailService _emailService;
        private readonly IHostingEnvironment _hostingEnv;
        private readonly IUserAgent _useragent;
        private readonly IDevice _device;
        private readonly AppSettings _appSettings;
        private readonly ISecurityTokenService _securityTokenService;

        public TestController(ILogger<TestController> logger, ISearchService searchService,
            IHttpContextAccessor httpContextAccessor, ISecurityTokenService securityTokenService,
            IEmailService emailService, IHostingEnvironment hostingEnv, IOptions<AppSettings> appSettings,
            IDeviceResolver deviceResolver)
        {
            _logger = logger;
            _searchService = searchService;
            _httpContextAccessor = httpContextAccessor;
            _emailService = emailService;
            _hostingEnv = hostingEnv;
            _appSettings = appSettings.Value;
            _securityTokenService = securityTokenService;

            _useragent = deviceResolver.UserAgent;
            _device = deviceResolver.Device;
        }

        [HttpGet("test")]
        public void TestLog()
        {
            var count = 456;
            _logger.LogError("Retrieved {Count} records", count);
            _searchService.SearchByBoundingBox();
        }

        [HttpGet("sqs")]
        public void TestSqs()
        {
            var jsonBookingRequest = JsonConvert.SerializeObject(new BookingRequest {ListingId = 1, BookingDate = DateTime.Now, Time = TimeSpan.MinValue});
            var result = jsonBookingRequest.PushToSqsAsync(@"https://sqs.ap-southeast-2.amazonaws.com/329384216861/meetthelocal-development");

            var abc = result.Result;
        }

        [HttpGet("ses")]
        public void TestSes()
        {
            // Supply your SMTP credentials below. Note that your SMTP 
            // credentials are different from your AWS credentials.
            // Replace with your SMTP username. 
            const String smtpUsername = "AKIAI3TLJMQZXEEOXVJA";
            // Replace with your SMTP password.
            const String smtpPassword = "AunTvjN3OYQ3wr7U/+cd6xNgGALsjQunkfFv04shUUpn";

            // Amazon SES SMTP host name. This example uses the US West 
            // (Oregon) region.
            const String host = "email-smtp.us-west-2.amazonaws.com";

            // The port you will connect to on the Amazon SES SMTP endpoint. We
            // are choosing port 587 because we will use STARTTLS to encrypt
            // the connection.
            const int port = 587;


            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Van", "cob911@gmail.com"));
            message.To.Add(new MailboxAddress("Bodom", "bodom0911@gmail.com"));
            message.Subject = "Amazon SES test (SMTP interface accessed using C#)";
            var bodyBuilder = new BodyBuilder {HtmlBody = @"<b>This is bold and this is <i>italic</i></b>"};
            message.Body = bodyBuilder.ToMessageBody();

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Connect(host, port, SecureSocketOptions.StartTls);

                    //client.AuthenticationMechanisms.Remove("XOAUTH2");
                    // Note: since we don't have an OAuth2 token, disable 	// the XOAUTH2 authentication mechanism.     client.Authenticate("anuraj.p@example.com", "password");
                    client.Authenticate(smtpUsername, smtpPassword);
                    client.Send(message);
                    client.Disconnect(true);
                }

                Console.WriteLine("Email sent!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        [HttpGet("em")]
        public void TestElasticMail()
        {
            var message = new MimeMessage();
            //var from new MailboxAddress("Van", "cob911@gmail.com"));
            message.To.Add(new MailboxAddress("Bodom", "bodom0911@gmail.com"));
            var subject = "This is a test from Elastic Mail";
            var bodyBuilder = new BodyBuilder { HtmlBody = @"<b>This is bold and this is <i>italic</i></b>" };
            message.Body = bodyBuilder.ToMessageBody();

            try
            {
                var result = ElasticEmailClient.Send(subject, "test@test.com", "Van", "sender", "senderName",
                    to: "cob911@gmail.com", bodyHtml: @"<b>This is bold and this is <i>italic</i></b>");

                var test = result.Result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("welcome")]
        public async void TestWelcomeMail()
        {
            try
            {
                //var emailContent = System.IO.File.ReadAllText(_appSettings.WelcomeEmailTemplate);

                //var emailContent = "Hello {firstname}";
                //_emailService.SendWelcomeEmail("cob911@gmail.com");
                //var test = _httpContextAccessor;
                //var hosting = _hostingEnv;

                var confirmEmailToken = $"{StringHelper.GetCurrentHostEnvironemnt(_httpContextAccessor)}user/confirmemail/{_securityTokenService.CreateTokenString(new User { Id = 1, Role = 1, Email = "asdasdf@afasd.com" }, DateTime.Now)}";

                var abs = await _emailService.SendWelcomeEmail(new WelcomeEmailViewModel { EmailConfirmationToken = confirmEmailToken }, "tabs+ca48b81e72da@gapps.emailtests.com");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("encrypt")]
        public async void Encrypt()
        {
            try
            {
                var encryptString = _securityTokenService.Encrypt("hey there");

                var decrypt = _securityTokenService.Decrypt(encryptString);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("reset")]
        public async void TestResetMail()
        {
            try
            {
                //var emailContent = System.IO.File.ReadAllText(_appSettings.WelcomeEmailTemplate);

                //var emailContent = "Hello {firstname}";
                //_emailService.SendWelcomeEmail("cob911@gmail.com");
                //var test = _httpContextAccessor;
                //var hosting = _hostingEnv;

                var confirmEmailToken = $"{StringHelper.GetCurrentHostEnvironemnt(_httpContextAccessor)}user/confirmemail/{_securityTokenService.CreateTokenString(new User { Id = 1, Role = 1, Email = "asdasdf@afasd.com" }, DateTime.Now)}";

                var abs = await _emailService.SendResetPasswordEmail(new ResetPasswordEmailViewModel { ResetLink = confirmEmailToken }, "email@gmail.com");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("booking")]
        public void TestBookingMail()
        {
            try
            {
                //var emailContent = System.IO.File.ReadAllText(_appSettings.WelcomeEmailTemplate);

                var emailContent = "Hello {firstname}";
                _emailService.SendBookingConfirmEmail(null, null, null);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("cloudinary")]
        public void Cloundinary()
        {
            // Assigned cloud name: dbncss4uz
            Account account = new Account(
              "dbncss4uz",
              "755678623562733",
              "sI8Sk2eyDL5odFEEO4XUOhxVAMM");

            Cloudinary cloudinary = new Cloudinary(account);

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(@"D:\profile.png")
            };
            var uploadResult = cloudinary.Upload(uploadParams);
        }

        [HttpGet("detect")]
        public void DetectClient()
        {
            if (_device.Type == DeviceType.Desktop)
            {
                //some logic
            }
            else if (_device.Type == DeviceType.Mobile)
            {
                //some logic
            }
            else if (_device.Type == DeviceType.Tablet)
            {
                //some logic
            }
        }
    }
}
