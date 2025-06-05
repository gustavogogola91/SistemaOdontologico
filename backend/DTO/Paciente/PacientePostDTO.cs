using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class PacientePostDTO
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string? Nome { get; set; }
        public string? Convenio { get; set; }
        [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
        public DateOnly DataNascimento { get; set; }
        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        public string? CPF { get; set; }
        [EmailAddress(ErrorMessage = "Email em formato inválido")]
        public string? Email { get; set; }
        [Phone(ErrorMessage = "Telefone em formato inválido")]
        public string? Telefone { get; set; }
        public string? Endereco { get; set; }
    }
}