using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Model;
using AussieTowns.Repository;


namespace AussieTowns.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<User> GetByEmailAndPassword(string email, string password)
        {
            return await _userRepository.GetByEmailAndPassword(email, password);
        }


        public async Task<int> Register(User user)
        {
            return await _userRepository.Insert(user);  
        }

        public async Task<int> Update(User user)
        {
            return await _userRepository.Update(user);
        }

        public async Task<int> Deactivate(int id)
        {
            return await _userRepository.Deactivate(id);
        }

        public async Task<IEnumerable<User>> SearchUser(string searchTerm)
        {
            return await _userRepository.SearchUser(searchTerm);
        }
    }
}
