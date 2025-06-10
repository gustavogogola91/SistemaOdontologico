namespace backend.DTO
{
    public class PacienteDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Convenio { get; set; }
        public DateOnly DataNascimento { get; set; }
        public string? CPF { get; set; }
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public string? Endereco { get; set; }
    }
}