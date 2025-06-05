using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Paciente
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "O campo Nome é obrigatório.")]
    public string? Nome { get; set; }
    [Required(ErrorMessage = "O campo Convênio é obrigatório.")]
    public string? Convenio { get; set; }

    [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
    public DateTime DataNascimento { get; set; }

    [Required(ErrorMessage = "O campo CPF é obrigatório.")]
    public string? CPF { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? Endereco { get; set; }
}