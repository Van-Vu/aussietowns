using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;

namespace AussieTowns.Repository
{
    public interface IUserRepository
    {
        IQueryable<User> GetAll();
        Task<User> GetById(int id);
        bool Register(User user);
        bool Update(User user);
        bool Delete(int id);
    }
}
