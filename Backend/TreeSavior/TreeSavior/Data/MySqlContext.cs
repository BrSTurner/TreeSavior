using Microsoft.EntityFrameworkCore;
using System;
using TreeSavior.Models;

namespace TreeSavior.Data
{
    public class MySqlContext : DbContext
    {
        public DbSet<Donator> Donators { get; private set; }
        public DbSet<Donation> Donations { get; private set; }
        public MySqlContext(DbContextOptionsBuilder contextOptionsBuilder) : base(contextOptionsBuilder.Options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Donator>().HasKey(x => x.Id);
            modelBuilder.Entity<Donator>().HasIndex(x => x.Id);
            modelBuilder.Entity<Donator>().Property(x => x.Name).IsRequired();
            modelBuilder.Entity<Donator>().Property(x => x.CPF).IsRequired();

            modelBuilder.Entity<Donation>().HasKey(x => x.Id);
            modelBuilder.Entity<Donation>().HasIndex(x => x.Id);
            modelBuilder.Entity<Donation>().Property(x => x.DonationDate).IsRequired().HasDefaultValue(DateTime.Now);
            modelBuilder.Entity<Donation>().Property(x => x.Quantity).IsRequired();
            modelBuilder.Entity<Donation>().Property(x => x.Value).IsRequired();
            modelBuilder.Entity<Donation>().Property(x => x.TotalAmount).IsRequired();
            modelBuilder.Entity<Donation>().Property(x => x.DonatorId).IsRequired();

            modelBuilder.Entity<Donation>()
                .HasOne(x => x.Donator)
                .WithMany(x => x.Donations)
                .HasForeignKey(x => x.DonatorId)
                .HasPrincipalKey(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);

            Donators = Set<Donator>();
            Donations = Set<Donation>();
        }


    }
}
