using System.ComponentModel.DataAnnotations;

public class Dentista
{
    [Key]
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Especialidade { get; set; }
    public required string CRO { get; set; }
    public required string Telefone { get; set; }
    public required string Email { get; set; }
}