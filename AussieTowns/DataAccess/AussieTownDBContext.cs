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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<SuburbDetail>().HasKey(m => m.Id);

            // shadow properties
            //builder.Entity<SuburbDetail>().Property<DateTime>("UpdatedTimestamp");

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            updateUpdatedProperty<SuburbDetail>();

            return base.SaveChanges();
        }

        private void updateUpdatedProperty<T>() where T : class
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in modifiedSourceInfo)
            {
                //entry.Property("UpdatedTimestamp").CurrentValue = DateTime.UtcNow;
            }
        }
    }
}
