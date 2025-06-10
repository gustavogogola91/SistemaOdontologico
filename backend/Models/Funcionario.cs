namespace backend.Models
{
    public class Funcionario : IFuncionario
    {
        public long Id { get; set; }
        public required string Nome { get; set; }
        public required string Username { get; set; }
        public required string Telefone { get; set; }
        public required string Email { get; set; }
        public required string Senha { get; set; }
    }
}