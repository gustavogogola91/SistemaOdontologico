using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Procedimento
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "O atributo nome é obrigatório.")]
    public string Nome { get; set; }
    public string? Observacoes { get; set; }

    [Required(ErrorMessage = "O atributo dentista é obrigatório.")]
    public int DentistaId { get; set; }
    public Dentista? Dentista { get; set; }

    [Required(ErrorMessage = "O atributo de valor do procedimento é obrigatório.")]
    public double Valor { get; set; }

}