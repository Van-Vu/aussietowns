using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IEmailLogRepository
    {
        Task<int> LogEmail(IList<EmailLog> emails);
    }
}
