using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class ConsultaPostDTO
    {
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public long PacienteId { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public long DentistaId { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public DateTime DataHora { get; set; }
        public ICollection<ProocedimentoConsultaPostDTO>? ListaProcedimentos { get; set; }
        public string? Observacoes { get; set; }
        public string? Convenio { get; set; }
    }
}