using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Consulta
{
    [Key]
    public int Id { get; set; }
    [Required (ErrorMessage = "O campo pacienteé obrigatório.")]
    public string? Paciente { get; set; }
    [Required (ErrorMessage = "O campo dentista} é obrigatório.")]
    public string? Dentista { get; set; }
    [Required (ErrorMessage = "O campo datahora é obrigatório.")]
    public DateTime DataHora { get; private set; }
    [Required (ErrorMessage = "O campo procedimento é obrigatório.")]
    public string? Procedimento { get; set; }
    public string? Observacoes { get; set; }
    public string? Convenio { get; set; }

    public Consulta()
        {
            DataHora = DateTime.UtcNow;
        }
}