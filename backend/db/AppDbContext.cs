using Microsoft.EntityFrameworkCore;

namespace backend.db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

    }
}