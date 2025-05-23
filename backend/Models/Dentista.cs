using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Dentista : IFuncionario
{
    public long Id { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Nome { get; set; }
    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Especialidade { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    [StringLength(10, MinimumLength = 5, ErrorMessage = "CRO inválido")]
    public required string CRO { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    [Phone(ErrorMessage = "Telefone em formato inválido")]
    public required string Telefone { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email em formato inválido")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Senha { get; set; }
}