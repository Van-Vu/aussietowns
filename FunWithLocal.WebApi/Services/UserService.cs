using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AussieTowns.Common;
using FunWithLocal.WebApi.Model;
using FunWithLocal.WebApi.Repository;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
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
                    throw new KeyNotFoundException($"Incorrect Source {user.Source}");
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

        public async Task<int> Update(UserRequest user)
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

        public async Task<User> VerifyResetToken(string resetToken)
        {
            return await _userRepository.GetUserByResetToken(resetToken);
            
        }

        public async Task<int> RequestPasswordReset(int userId, string resetToken, DateTime expiryDate)
        {
            try
            {
                return await _userRepository.RequestPasswordReset(userId, resetToken, expiryDate);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message, e);
                throw;
            }
        }

        public async Task<int> UpdatePassword(User user, bool isChangePassword)
        {
            return await _userRepository.ChangePassword(user, isChangePassword);
        }

        public async Task<User> GetByIdAndEmail(int id, string email)
        {
            return await _userRepository.GetByIdAndEmail(id, email);
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _userRepository.GetByEmail(email);
        }

        public async Task<int> ConfirmEmail(UserRequest user)
        {
            return await _userRepository.ConfirmEmail(user);
        }

        public async Task<User> GetByEmailAndExternalId(string email, string externalId)
        {
            return await _userRepository.GetByEmailAndExternalId(email, externalId);
        }

        //public ICollection<User> SearchUsers(string term)
        //{
        //    return _userRepository.GetAll().Where(x => x.FirstName.Contains(term) || x.LastName.Contains(term) || x.Email.Contains(term)).ToList();
        //}
    }
}
