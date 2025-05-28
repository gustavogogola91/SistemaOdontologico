using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Login
    {
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public required string Senha { get; set; }
    }
}