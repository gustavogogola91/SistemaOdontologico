using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Funcionario : IFuncionario
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public required string Nome { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Phone(ErrorMessage = "Telefone em formato inválido")]
        public required string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email em formato inválido")]
        public required string Email { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public required string Senha { get; set; }
    }
}