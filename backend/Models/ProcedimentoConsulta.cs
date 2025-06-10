using System.ComponentModel.DataAnnotations;
using SistemaOdontologico.Models;

namespace backend.Models
{
    public class ProcedimentoConsulta
    {
        public ProcedimentoConsulta(long procedimentoId)
        {
            ProcedimentoId = procedimentoId;
        }
        
        [Key]
        public long Id { get; set; }
        public long ConsultaId { get; set; }
        public Consulta? Consulta { get; set; }
        public long ProcedimentoId { get; set; }
        public Procedimento? Procedimento { get; set; }
    }
}