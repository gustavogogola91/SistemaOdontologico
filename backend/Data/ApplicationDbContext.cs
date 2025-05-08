using Microsoft.EntityFrameworkCore;
using SistemaOdontologico.Models;

namespace SistemaOdontologico.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Dentista> Dentistas { get; set; } // Adicione esta linha
}