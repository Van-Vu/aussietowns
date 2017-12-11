using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Services
{
    public interface IUserService
    {
        Task<User> GetById(int id);

        Task<User> GetByIdAndEmail(int id, string email);

        Task<User> GetByEmail(string email);

        Task<User> VerifyUser(User user);
        Task<IEnumerable<User>> SearchUser(string searchTerm);
        Task<int> Register(User user);
        Task<int> Update(User user);

        Task<int> UpdatePassword(User user, bool isChangePassword);
        Task<int> Deactivate(int id);

        Task<User> VerifyResetToken(string resetToken);

        Task<int> RequestPasswordReset(int userId, string resetToken, DateTime expiryDate);
    }
}
