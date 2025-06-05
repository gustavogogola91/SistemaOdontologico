using System.ComponentModel.DataAnnotations;
using SistemaOdontologico.Models;

namespace backend.Models
{
    public class ProcedimentoConsulta
    {
        public ProcedimentoConsulta(int procedimentoId)
        {
            ProcedimentoId = procedimentoId;
        }
        
        [Key]
        public int Id { get; set; }
        public int ConsultaId { get; set; }
        public Consulta? Consulta { get; set; }
        public int ProcedimentoId { get; set; }
        public Procedimento? Procedimento { get; set; }
    }
}