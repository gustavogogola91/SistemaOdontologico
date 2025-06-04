namespace backend.DTO
{
    public class ConsultaPutDTO
    {
        public int DentistaId { get; set; }
        public DateTime DataHora { get; private set; }
        public string? Observacoes { get; set; }
        public string? Convenio { get; set; }
    }
}