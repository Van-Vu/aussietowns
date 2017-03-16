﻿using System;
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
            return _context.Users.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
        }

        public bool Register(User user)
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
                _context.Entry(user).State = EntityState.Modified;

                _context.SaveChanges();

                // Reset the state in case of multiple Update
                _context.Entry(user).State = EntityState.Detached;
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
