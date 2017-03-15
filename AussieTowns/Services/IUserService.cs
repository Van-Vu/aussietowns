using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Services
{
    public interface IUserService
    {
        IList<User> GetAll();
        Task<User> GetById(int id);
        User GetByEmailAndPassword(string email, string password);
        bool Register(User user);
        bool Update(User user);
        bool Delete(int id);

    }
}
