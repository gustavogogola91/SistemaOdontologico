using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Dentista : IFuncionario
{
    [Key]
    public long Id { get; set; }
    public required string Nome { get; set; }
    public required string Username { get; set; }
    public required string Especialidade { get; set; }
    public required string CRO { get; set; }
    public required string Telefone { get; set; }
    public required string Email { get; set; }
    public required string Senha { get; set; }
}