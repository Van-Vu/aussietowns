using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using AussieTowns.Model;
using AussieTowns.Repository;
using AussieTowns.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using RazorLight;

namespace AussieTowns.Services
{
    public class EmailService: IEmailService
    {
        private readonly IEmailLogRepository _emailLogRepository;
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings, IEmailLogRepository emailLogRepository)
        {
            _emailLogRepository = emailLogRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<int> SendBookingConfirmEmail(BookingEmailViewModel emailViewModel, string hostEmail, string hostName)
        {
            //var engine = EngineFactory.CreatePhysical(_appSettings.EmailTemplateFolder);
            var engine = EngineFactory.CreatePhysical($"{Directory.GetCurrentDirectory()}\\Content\\EmailTemplates");

            emailViewModel.EmailHeader = $"Hi, thanks for your booking";
            var emailContentForGuests = engine.Parse(_appSettings.BookingGuestsEmailTemplate, emailViewModel);

            emailViewModel.EmailHeader = $"Hi, you have a new booking";
            var emailContentForHost = engine.Parse(_appSettings.BookingGuestsEmailTemplate, emailViewModel);

            var emailLogs = new List<EmailLog>();

            var particiants = string.Join(",", emailViewModel.BookingParticipants.Select(x => x.Email));

            if (_appSettings.Environment != "prod")
            {
                particiants = "bodom0911@gmail.com";

                emailLogs.Add(new EmailLog
                {
                    ListingId = emailViewModel.ListingId,
                    FromAddress = _appSettings.DefaultEmailAddress,
                    ToAddress = string.Join(",", particiants),
                    Subject = _appSettings.BookingEmailSubject,
                    Content = emailContentForGuests,
                    CreatedDate = DateTime.Now,
                    //MessageId = x.Result.MessageID,
                    //TransactionId = x.Result.TransactionID,
                    Status = true
                });

                emailLogs.Add(new EmailLog
                {
                    ListingId = emailViewModel.ListingId,
                    FromAddress = _appSettings.DefaultEmailAddress,
                    ToAddress = hostEmail,
                    Subject = _appSettings.BookingEmailSubject,
                    Content = emailContentForHost,
                    CreatedDate = DateTime.Now,
                    //MessageId = x.Result.MessageID,
                    //TransactionId = x.Result.TransactionID,
                    Status = true
                });

            }
            else
            {
                var sendList = new List<Task>
                {
                    ElasticEmailClient.Send(_appSettings.BookingEmailSubject, _appSettings.DefaultEmailAddress, _appSettings.DefaultEmailName,to: particiants, bodyHtml: emailContentForGuests, isTransactional:true)
                        .ContinueWith(x => emailLogs.Add(new EmailLog
                        {
                            ListingId = emailViewModel.ListingId,
                            FromAddress = _appSettings.DefaultEmailAddress,
                            ToAddress = string.Join(",", particiants),
                            Subject = _appSettings.BookingEmailSubject,
                            Content = emailContentForGuests,
                            CreatedDate = DateTime.Now,
                            MessageId = x.Result.MessageID,
                            TransactionId = x.Result.TransactionID,
                            Status = true
                        })),
                    ElasticEmailClient.Send(_appSettings.BookingEmailSubject, _appSettings.DefaultEmailAddress, _appSettings.DefaultEmailName,to: hostEmail, bodyHtml: emailContentForHost, isTransactional:true)
                        .ContinueWith(x => emailLogs.Add(new EmailLog
                        {
                            ListingId = emailViewModel.ListingId,
                            FromAddress = _appSettings.DefaultEmailAddress,
                            ToAddress = hostEmail,
                            Subject = _appSettings.BookingEmailSubject,
                            Content = emailContentForHost,
                            CreatedDate = DateTime.Now,
                            MessageId = x.Result.MessageID,
                            TransactionId = x.Result.TransactionID,
                            Status = true
                        }))
                };

                await Task.WhenAll(sendList);
            }

            return await _emailLogRepository.LogEmail(emailLogs);

            //return sendList.Select(x => x.Result).ToList();
        }

        public async Task<int> SendWelcomeEmail(string receivers)
        {
            var emailContent = File.ReadAllText(_appSettings.EmailTemplateFolder + _appSettings.WelcomeEmailTemplate);

            var emailLogs = new List<EmailLog>();

            if (_appSettings.Environment != "prod")
            {
                receivers = "bodom0911@gmail.com";
                emailLogs.Add(new EmailLog
                {
                    ListingId = 0,
                    FromAddress = _appSettings.DefaultEmailAddress,
                    ToAddress = receivers,
                    Subject = _appSettings.BookingEmailSubject,
                    Content = emailContent,
                    CreatedDate = DateTime.Now,
                    Status = true
                });
            }
            else
            {
                await ElasticEmailClient.Send(_appSettings.WelcomeEmailSubject, _appSettings.DefaultEmailAddress,
                        _appSettings.DefaultEmailName,
                        to: receivers, bodyHtml: emailContent)
                    .ContinueWith(x => emailLogs.Add(new EmailLog
                    {
                        ListingId = 0,
                        FromAddress = _appSettings.DefaultEmailAddress,
                        ToAddress = receivers,
                        Subject = _appSettings.BookingEmailSubject,
                        Content = emailContent,
                        CreatedDate = DateTime.Now,
                        MessageId = x.Result.MessageID,
                        TransactionId = x.Result.TransactionID,
                        Status = true
                    }));
            }

            return await _emailLogRepository.LogEmail(emailLogs);
        }
    }
}
