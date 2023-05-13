using eVert.Auth.Model;
using eVert.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data
{
    public class eVertDbContext : IdentityDbContext<eVertUser>
    {
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<BuyAdvertisement> BuyAdvertisements { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<eVertUser> Users { get; set; }
        public DbSet<SoldAdvertisement> SoldAdvertisements { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:evertserv.database.windows.net,1433;Initial Catalog=evertDatabase;Persist Security Info=False;" +
                "User ID=evert;Password=Tadas123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
