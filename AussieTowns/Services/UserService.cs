using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace AussieTowns.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IList<User> GetAll()
        {
            return _userRepository.GetAll().ToList();
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public User GetByEmailAndPassword(string email, string password)
        {
            return _userRepository.GetAll()?.SingleOrDefault(x => x.Email == email && x.Password == password);
        }


        public bool Register(User user)
        {
            return _userRepository.Insert(user);  
        }

        public bool Update(User user)
        {
            return _userRepository.Update(user);
        }

        public bool Delete(int id)
        {
            return _userRepository.Delete(id);
        }

        public ICollection<User> SearchUsers(string term)
        {
            return _userRepository.GetAll().Where(x => x.FirstName.Contains(term) || x.LastName.Contains(term) || x.Email.Contains(term)).ToList();
        }
    }
}
