using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IUserRepository
    {
        Task<User> GetById(int id);
        Task<User> GetByEmailAndPassword(string email, string password);
        Task<IEnumerable<User>> SearchUser(string searchTerm);
        Task<int> Insert(User user);
        Task<int> Update(User user);
        Task<int> Deactivate(int id);
    }
}
