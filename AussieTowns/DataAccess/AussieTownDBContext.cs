using System;
using System.Linq;
using AussieTowns.Model;
using Microsoft.EntityFrameworkCore;

namespace AussieTowns.DataAccess
{
    public class AussieTownDBContext : DbContext
    {
        public AussieTownDBContext(DbContextOptions<AussieTownDBContext> options) : base(options)
            { }

        public DbSet<SuburbDetail> SuburbDetails { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
