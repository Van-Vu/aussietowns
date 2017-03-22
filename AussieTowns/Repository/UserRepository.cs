using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AussieTowns.DataAccess;
using AussieTowns.Model;
using Microsoft.EntityFrameworkCore;

namespace AussieTowns.Repository
{
    public class UserRepository:IUserRepository
    {
        private readonly AussieTownDBContext _context;

        public UserRepository(AussieTownDBContext context)
        {
            _context = context;
        }

        public IQueryable<User> GetAll()
        {
            return _context.Users.AsNoTracking();
        }

        public Task<User> GetById(int id)
        {
            //Bodom: cause Self referencing loop detected
            //return _context.Users.Include(s => s.TourOperators)
            //.ThenInclude(e => e.TourOffer).SingleOrDefaultAsync(x => x.Id == id);

            return _context.Users.SingleOrDefaultAsync(x => x.Id == id);
        }

        public bool Insert(User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool Update(User user)
        {
            try
            {
                _context.DetachEntity<User>(user.Id);

                _context.Entry(user).State = EntityState.Modified;

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public bool Delete(int id)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x => x.Id == id);
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
