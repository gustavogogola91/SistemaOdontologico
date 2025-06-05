using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Procedimento
{
    [Key]
    public long Id { get; set; }

    [Required(ErrorMessage = "O atributo nome é obrigatório.")]
    public required string Nome { get; set; }
    public string? Observacoes { get; set; }

    [Required(ErrorMessage = "O atributo dentista é obrigatório.")]
    public long DentistaId { get; set; }
    public Dentista? Dentista { get; set; }

    [Required(ErrorMessage = "O atributo de valor do procedimento é obrigatório.")]
    public double Valor { get; set; }

}