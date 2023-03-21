using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data
{
    public class eVertDbContext : DbContext
    {
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:evertsqlserver.database.windows.net,1433;Initial Catalog=eVertDB;" +
                "Persist Security Info=False;User ID=evert;Password=Tadas123!;MultipleActiveResultSets=False;Encrypt=True;" +
                "TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
