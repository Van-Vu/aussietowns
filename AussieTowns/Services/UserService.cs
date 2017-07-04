using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Common;
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

        public async Task<User> VerifyUser(User user)
        {
            switch (user.Source)
            {
                    case UserSource.Native:
                        return await GetByEmailAndPassword(user.Email, user.Password);
                    case UserSource.Facebook:
                    case UserSource.Google:
                        return await GetUserByExternalInfo(user.Email, user.Source, user.ExternalId);
                    default:
                        throw new KeyNotFoundException();
            }
            
        }

        private async Task<User> GetByEmailAndPassword(string email, string password)
        {
            return await _userRepository.GetByEmailAndPassword(email, password);
        }
        private async Task<User> GetUserByExternalInfo(string email, UserSource source, string externalId)
        {
            return await _userRepository.GetByExternalInfo(email, (int)source, externalId);
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
