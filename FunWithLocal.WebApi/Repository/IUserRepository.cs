using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using FunWithLocal.WebApi.Model;

namespace FunWithLocal.WebApi.Repository
{
    public interface IUserRepository
    {
        Task<User> GetById(int id);

        Task<User> GetByIdAndEmail(int id, string email);
        Task<User> GetByEmail(string email);
        Task<User> GetByEmailAndExternalId(string email, string externalId);
        Task<User> GetByEmailAndPassword(string email, string password);
        Task<User> GetByExternalInfo(string email, int source, string externalId);
        Task<IEnumerable<User>> SearchUser(string searchTerm);
        Task<int> Insert(User user);
        Task<int> Update(UserRequest profile);

        Task<int> ConfirmEmail(UserRequest profile);
        Task<int> ChangePassword(User user, bool isChangePassword);
        Task<int> Deactivate(int id);

        Task<int> RequestPasswordReset(int userId, string resetToken, DateTime expiryDate);
        Task<User> GetUserByResetToken(string resetToken);
    }
}
