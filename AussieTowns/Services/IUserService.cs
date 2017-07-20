using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IUserService
    {
        Task<User> GetById(int id);
        Task<User> VerifyUser(User user);
        Task<IEnumerable<User>> SearchUser(string searchTerm);
        Task<int> Register(User user);
        Task<int> Update(Profile user);
        Task<int> Deactivate(int id);
    }
}
