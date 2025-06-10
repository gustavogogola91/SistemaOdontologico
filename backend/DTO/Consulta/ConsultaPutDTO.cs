namespace backend.DTO
{
    public class ConsultaPutDTO
    {
        public long DentistaId { get; set; }
        public DateTime DataHora { get; set; }
        public string? Observacoes { get; set; }
        public string? Convenio { get; set; }
    }
}