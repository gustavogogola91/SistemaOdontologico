using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SistemaOdontologico.Controllers
{
    [ApiController]
    [Route("prontuario/")]
    public class ProntuarioController : ControllerBase
    {
        private readonly AppDbContext _database;

        public ProntuarioController(AppDbContext database)
        {
            _database = database;
        }

        private void AjustarDateTimesParaUtc(Prontuario prontuario)
        {
            if (prontuario.DataNascimento.HasValue)
                prontuario.DataNascimento = DateTime.SpecifyKind(prontuario.DataNascimento.Value, DateTimeKind.Utc);

            if (prontuario.DataRegistro.HasValue)
                prontuario.DataRegistro = DateTime.SpecifyKind(prontuario.DataRegistro.Value, DateTimeKind.Utc);

            if (prontuario.UltimoTratamentoDentario.HasValue)
                prontuario.UltimoTratamentoDentario = DateTime.SpecifyKind(prontuario.UltimoTratamentoDentario.Value, DateTimeKind.Utc);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prontuario>>> GetProntuarios()
        {
            var prontuarios = await _database.tb_prontuario.ToListAsync();
            if (prontuarios == null || !prontuarios.Any())
            {
                return NotFound("Nenhum prontuário cadastrado!");
            }
            return Ok(prontuarios);
        }

        [HttpPost]
        public async Task<ActionResult> AddProntuario([FromBody] Prontuario prontuario)
        {
            if (prontuario == null)
            {
                return BadRequest("Dados do prontuário inválidos!");
            }

            AjustarDateTimesParaUtc(prontuario);

            _database.tb_prontuario.Add(prontuario);
            await _database.SaveChangesAsync();
            return Created("Prontuario criado com sucesso", prontuario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prontuario>> GetProntuario(int id)
        {
            var prontuario = await _database.tb_prontuario.FindAsync(id);

            if (prontuario == null)
            {
                return NotFound("Prontuário não encontrado!");
            }

            return Ok(prontuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProntuario(int id, [FromBody] Prontuario prontuario)
        {
            var prontuarioExistente = await _database.tb_prontuario.FindAsync(id);

            if (prontuarioExistente == null)
            {
                return NotFound("Prontuário não encontrado!");
            }

            // Atualiza todas as propriedades
            prontuarioExistente.Nome = prontuario.Nome;
            prontuarioExistente.RG = prontuario.RG;
            prontuarioExistente.CPF = prontuario.CPF;
            prontuarioExistente.DataNascimento = prontuario.DataNascimento;
            prontuarioExistente.EstadoCivil = prontuario.EstadoCivil;
            prontuarioExistente.Profissao = prontuario.Profissao;
            prontuarioExistente.Telefone = prontuario.Telefone;
            prontuarioExistente.Email = prontuario.Email;
            prontuarioExistente.EnderecoResidencial = prontuario.EnderecoResidencial;
            prontuarioExistente.TomaMedicamento = prontuario.TomaMedicamento;
            prontuarioExistente.Medicamentos = prontuario.Medicamentos;
            prontuarioExistente.TemAlergia = prontuario.TemAlergia;
            prontuarioExistente.TipoAlergia = prontuario.TipoAlergia;
            prontuarioExistente.Pressao = prontuario.Pressao;
            prontuarioExistente.ProblemaCoracao = prontuario.ProblemaCoracao;
            prontuarioExistente.ProblemaCoracaoTipo = prontuario.ProblemaCoracaoTipo;
            prontuarioExistente.TemDiabetes = prontuario.TemDiabetes;
            prontuarioExistente.DiabetesTipo = prontuario.DiabetesTipo;
            prontuarioExistente.Cicatrizacao = prontuario.Cicatrizacao;
            prontuarioExistente.JaFezCirurgia = prontuario.JaFezCirurgia;
            prontuarioExistente.Gestante = prontuario.Gestante;
            prontuarioExistente.SemanasGestacao = prontuario.SemanasGestacao;
            prontuarioExistente.ProblemasSaude = prontuario.ProblemasSaude;
            prontuarioExistente.QueixaPrincipal = prontuario.QueixaPrincipal;
            prontuarioExistente.ReacaoAnestesia = prontuario.ReacaoAnestesia;
            prontuarioExistente.UltimoTratamentoDentario = prontuario.UltimoTratamentoDentario;
            prontuarioExistente.GengivaSangra = prontuario.GengivaSangra;
            prontuarioExistente.EscovaPorDia = prontuario.EscovaPorDia;
            prontuarioExistente.UsoFioDental = prontuario.UsoFioDental;
            prontuarioExistente.DorEstaloMaxilarOuvido = prontuario.DorEstaloMaxilarOuvido;
            prontuarioExistente.RangeDentes = prontuario.RangeDentes;
            prontuarioExistente.BolhaFaceLabios = prontuario.BolhaFaceLabios;
            prontuarioExistente.Fuma = prontuario.Fuma;
            prontuarioExistente.QuantidadeCigarros = prontuario.QuantidadeCigarros;
            prontuarioExistente.OutrasInformacoes = prontuario.OutrasInformacoes;
            prontuarioExistente.DataRegistro = prontuario.DataRegistro;

            // Ajusta os DateTimes para UTC
            AjustarDateTimesParaUtc(prontuarioExistente);   

            await _database.SaveChangesAsync();
            return Ok("Prontuário atualizado com sucesso!");
        }

        [HttpPut("atualizar-informacoes/{id}")]
        public async Task<IActionResult> AtualizarInformacoesProntuario(int id, [FromBody] Prontuario prontuarioAtualizacao)
        {
            var prontuarioExistente = await _database.tb_prontuario.FindAsync(id);
        
            if (prontuarioExistente == null)
            {
                return NotFound("Prontuário não encontrado!");
            }
        
            // Só atualiza se vier valor diferente de null
            if (prontuarioAtualizacao.QueixaPrincipal != null)
                prontuarioExistente.QueixaPrincipal = prontuarioAtualizacao.QueixaPrincipal;
        
            if (prontuarioAtualizacao.ProblemasSaude != null)
                prontuarioExistente.ProblemasSaude = prontuarioAtualizacao.ProblemasSaude;
        
            if (prontuarioAtualizacao.OutrasInformacoes != null)
                prontuarioExistente.OutrasInformacoes = prontuarioAtualizacao.OutrasInformacoes;
        
            if (prontuarioAtualizacao.Medicamentos != null)
                prontuarioExistente.Medicamentos = prontuarioAtualizacao.Medicamentos;
        
            prontuarioExistente.TomaMedicamento = prontuarioAtualizacao.TomaMedicamento;
            prontuarioExistente.UltimoTratamentoDentario = prontuarioAtualizacao.UltimoTratamentoDentario;
            prontuarioExistente.GengivaSangra = prontuarioAtualizacao.GengivaSangra;
            prontuarioExistente.EscovaPorDia = prontuarioAtualizacao.EscovaPorDia;
            prontuarioExistente.UsoFioDental = prontuarioAtualizacao.UsoFioDental;
            prontuarioExistente.DorEstaloMaxilarOuvido = prontuarioAtualizacao.DorEstaloMaxilarOuvido;
            prontuarioExistente.RangeDentes = prontuarioAtualizacao.RangeDentes;
            prontuarioExistente.BolhaFaceLabios = prontuarioAtualizacao.BolhaFaceLabios;
            prontuarioExistente.Fuma = prontuarioAtualizacao.Fuma;
            prontuarioExistente.QuantidadeCigarros = prontuarioAtualizacao.QuantidadeCigarros;
        
            AjustarDateTimesParaUtc(prontuarioExistente);
        
            await _database.SaveChangesAsync();
            return Ok("Informações do prontuário atualizadas com sucesso!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProntuario(int id)
        {
            var prontuario = await _database.tb_prontuario.FindAsync(id);

            if (prontuario == null)
            {
                return NotFound("Prontuário não encontrado!");
            }

            _database.tb_prontuario.Remove(prontuario);
            await _database.SaveChangesAsync();
            return Ok("Prontuário deletado com sucesso!");
        }
    }
}