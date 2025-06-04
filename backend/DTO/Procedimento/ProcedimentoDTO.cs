namespace backend.DTO
{
    public class ProcedimentoDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Observacoes { get; set; }
        public DentistaDTO? Dentista { get; set; }
        public double Valor { get; set; }
    }
}