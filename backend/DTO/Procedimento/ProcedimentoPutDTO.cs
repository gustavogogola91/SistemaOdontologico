namespace backend.DTO
{
    public class ProcedimentoPutDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Observacoes { get; set; }
        public int DentistaId { get; set; }
        public double Valor { get; set; }
    }
}
