using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Paciente
{
    [Key]
    public long Id { get; set; }

    public required string Nome { get; set; }
    public string? Convenio { get; set; }
    public DateOnly DataNascimento { get; set; }
    public required string CPF { get; set; }
    public required string Email { get; set; }
    public required string Telefone { get; set; }
    public required string Endereco { get; set; }
}