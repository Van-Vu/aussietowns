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
            return _userRepository.GetAll();
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public bool Register(User user)
        {
            return _userRepository.Register(user);  
        }

        public bool Update(User user)
        {
            return _userRepository.Update(user);
        }

        public bool Delete(int id)
        {
            return _userRepository.Delete(id);
        }
    }
}
