using System;
using System.Linq;
using AussieTowns.Model;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace AussieTowns.DataAccess
{
    public class AussieTownDBContext : DbContext
    {
        public AussieTownDBContext(DbContextOptions<AussieTownDBContext> options) : base(options)
            { }

        public DbSet<SuburbDetail> SuburbDetails { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Listing> Listings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(c => c.TourOperators)
                .WithOne(e => e.User)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(c => c.TourGuests)
                .WithOne(e => e.User)
                .IsRequired();

            modelBuilder.Entity<Listing>()
                .HasOne(p => p.Location)
                .WithMany(b => b.Listings);

            modelBuilder.Entity<Listing>()
                .HasMany(c => c.TourOperators)
                .WithOne(e => e.Listing)
                .IsRequired();

            modelBuilder.Entity<Listing>()
                .HasMany(c => c.TourGuests)
                .WithOne(e => e.Listing)
                .IsRequired();

            modelBuilder.Entity<Listing>()
                .HasMany(c => c.Schedules)
                .WithOne(e => e.Listing)
                .IsRequired();

            modelBuilder.Entity<TourOperator>()
                .HasKey(to => new { to.ListingId, to.UserId });

            modelBuilder.Entity<TourOperator>()
                .HasOne(bc => bc.Listing)
                .WithMany(b => b.TourOperators)
                .HasForeignKey(bc => bc.ListingId);

            modelBuilder.Entity<TourOperator>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.TourOperators)
                .HasForeignKey(bc => bc.UserId);

            modelBuilder.Entity<TourGuest>()
                .HasKey(to => new { to.ListingId, to.UserId });

            modelBuilder.Entity<TourGuest>()
                .HasOne(bc => bc.Listing)
                .WithMany(b => b.TourGuests)
                .HasForeignKey(bc => bc.ListingId);

            modelBuilder.Entity<TourGuest>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.TourGuests)
                .HasForeignKey(bc => bc.UserId);
        }


        public void DetachEntity<T>(int entryId) where T:class, IIdentifier
        {
            var local = Set<T>().FirstOrDefault(entry => entry.Id.Equals(entryId));
            if (local != null)
            {
                Entry(local).State = EntityState.Detached;
            }
        }
    }

    public interface IIdentifier
    {
        int Id { get; set; }
    } 
}
