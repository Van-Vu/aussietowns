using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Common;
using FunWithLocal.WebApi.ViewModel;

namespace AussieTowns.Services
{
    public interface IEmailService
    {
        Task<int> SendBookingConfirmEmail(BookingEmailViewModel emailViewModel, string hostEmail, string hostName);

        Task<int> SendWelcomeEmail(WelcomeEmailViewModel viewModel, string receivers);

        Task<int> SendResetPasswordEmail(ResetPasswordEmailViewModel viewModel, string receivers);
    }
}
