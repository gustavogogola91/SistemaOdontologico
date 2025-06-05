using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace SistemaOdontologico.Models;

public class Consulta
{
    [Key]
    public int Id { get; set; }
    public int PacienteId { get; set; }
    public Paciente? Paciente { get; set; }
    public int DentistaId { get; set; }
    public Dentista? Dentista { get; set; }
    public DateTime DataHora { get; set; }
    public ICollection<ProcedimentoConsulta>? Procedimentos { get; set; } = [];
    public string? Observacoes { get; set; }
    public string? Convenio { get; set; }
}