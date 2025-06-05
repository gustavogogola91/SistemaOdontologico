namespace backend.Models
{
    public interface IFuncionario
    {
        public long Id { get; set; }
        public string Username { get; set; }

        public string Senha { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
    }


}