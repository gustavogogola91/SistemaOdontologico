using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace SistemaOdontologico.Models;

public class Consulta
{
    [Key]
    public long Id { get; set; }
    public long PacienteId { get; set; }
    public Paciente? Paciente { get; set; }
    public long DentistaId { get; set; }
    public Dentista? Dentista { get; set; }
    public DateTime DataHora { get; set; }
    public ICollection<ProcedimentoConsulta>? Procedimentos { get; set; } = [];
    public string? Observacoes { get; set; }
    public string? Convenio { get; set; }
}