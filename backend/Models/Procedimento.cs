using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Procedimento
{
    [Key]
    public long Id { get; set; }
    public required string Nome { get; set; }
    public string? Observacoes { get; set; }
    public long DentistaId { get; set; }
    public Dentista? Dentista { get; set; }
    public double Valor { get; set; }

}