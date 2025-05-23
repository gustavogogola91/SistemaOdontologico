using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models;

public class Prontuario
{
    [Key]
    public int Id { get; set; }

    // Informações do Paciente
    [Required(ErrorMessage = "O campo Nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O campo RG é obrigatório.")]
    public string? RG { get; set; }

    [Required(ErrorMessage = "O campo CPF é obrigatório.")]
    public string? CPF { get; set; }

    [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
    [DataType(DataType.Date)]
    public DateTime? DataNascimento { get; set; }

    [Required(ErrorMessage = "O campo Estado Civil é obrigatório.")]
    public string? EstadoCivil { get; set; }

    [Required(ErrorMessage = "O campo Profissão é obrigatório.")]
    public string? Profissao { get; set; }

    [Required(ErrorMessage = "O campo Telefone é obrigatório.")]
    public string? Telefone { get; set; }

    [Required(ErrorMessage = "O campo Email é obrigatório.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "O campo Endereço Residencial é obrigatório.")]
    public string? EnderecoResidencial { get; set; }

    // Anamnese
    public bool TomaMedicamento { get; set; }
    public string? Medicamentos { get; set; }

    public bool TemAlergia { get; set; }
    public string? TipoAlergia { get; set; }

    public string? Pressao { get; set; } // Normal, Alta, Baixa, Controlada

    public bool ProblemaCoracao { get; set; }
    public string? ProblemaCoracaoTipo { get; set; } // Ex: Arritmia, Infarto, etc.

    public bool TemDiabetes { get; set; }
    public string? DiabetesTipo { get; set; } // Tipo 1, Tipo 2, Gestacional   

    public string? Cicatrizacao { get; set; } // Normal, Complicada

    public bool JaFezCirurgia { get; set; }

    public bool Gestante { get; set; }
    public int? SemanasGestacao { get; set; }

    public string? ProblemasSaude { get; set; }
    public string? QueixaPrincipal { get; set; }

    public bool ReacaoAnestesia { get; set; }

    public DateTime? UltimoTratamentoDentario { get; set; }

    public string? GengivaSangra { get; set; } // Sim, Não, Durante a higiene, Às vezes

    public int? EscovaPorDia { get; set; }

    public string? UsoFioDental { get; set; } // Diariamente, Às vezes

    public bool DorEstaloMaxilarOuvido { get; set; }

    public bool RangeDentes { get; set; }

    public bool BolhaFaceLabios { get; set; }

    public bool Fuma { get; set; }
    public int? QuantidadeCigarros { get; set; }

    public string? OutrasInformacoes { get; set; }

    // Data e assinatura (opcional, para registro)
    public DateTime? DataRegistro { get; set; }
}