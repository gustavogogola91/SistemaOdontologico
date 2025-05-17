using Microsoft.EntityFrameworkCore;
using SistemaOdontologico.Models;

namespace SistemaOdontologico.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Dentista> Dentistas { get; set; } // Adicione esta linha
    public DbSet<Dentista> tb_dentista { get; set; }
    public DbSet<Consulta> tb_consulta { get; set; } // Adicione esta linha
    public DbSet<Paciente> tb_paciente { get; set; } // Adicione esta linha
}