using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace AussieTowns.Extensions
{
    public static class AwsSesExtensions
    {
        public static void SendEmail(this string emailContent, string subject)
        {
            // Supply your SMTP credentials below. Note that your SMTP 
            // credentials are different from your AWS credentials.
            // Replace with your SMTP username. 
            const string smtpUsername = "AKIAI3TLJMQZXEEOXVJA";
            // Replace with your SMTP password.
            const string smtpPassword = "AunTvjN3OYQ3wr7U/+cd6xNgGALsjQunkfFv04shUUpn";

            // Amazon SES SMTP host name. This example uses the US West 
            // (Oregon) region.
            const string host = "email-smtp.us-west-2.amazonaws.com";

            // The port you will connect to on the Amazon SES SMTP endpoint. We
            // are choosing port 587 because we will use STARTTLS to encrypt
            // the connection.
            const int port = 587;


            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Van", "cob911@gmail.com"));
            message.To.Add(new MailboxAddress("Bodom", "bodom0911@gmail.com"));
            message.Subject = subject;
            var bodyBuilder = new BodyBuilder { HtmlBody = emailContent };
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
