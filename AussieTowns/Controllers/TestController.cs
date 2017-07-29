using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Extensions;
using AussieTowns.Model;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Newtonsoft.Json;

namespace AussieTowns.Controllers
{
    [Route("api/[controller]")]
    public class TestController
    {
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
    }
}
