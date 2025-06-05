using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Dentista : IFuncionario
{
    [Key]
    public long Id { get; set; }
    public required string Nome { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Especialidade { get; set; }
    public required string CRO { get; set; }
    public required string Telefone { get; set; }
    public required string Email { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Senha { get; set; }
}