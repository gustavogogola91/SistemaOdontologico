namespace backend.DTO
{
    public class ConsultaDTO
    {
        public int Id { get; set; }
        public PacienteDTO? Paciente { get; set; }
        public DentistaDTO? Dentista { get; set; }
        public DateTime DataHora { get; set; }
        public ICollection<ProcedimentoConsultaDTO>? Procedimentos { get; set; }
        public string? Observacoes { get; set; }
        public string? Convenio { get; set; }
    }
}