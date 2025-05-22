using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("procedimento/")]
    public class ProcedimentoController : ControllerBase
    {
        private readonly AppDbContext _database;

        public ProcedimentoController(AppDbContext database)
        {
            _database = database;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetProcedimentos()
            {
                try
                {
                    var procedimentos = await _database.tb_procedimento.ToListAsync();
                    if (procedimentos == null || !procedimentos.Any())
                        return NotFound("Sem Consultas cadastradas!");

                    return Ok(procedimentos);
                }
                catch (Exception error)
                {
                    return BadRequest(error);
                }
            }
        
        [HttpPost]
        public async Task<ActionResult> AddProcedimento([FromBody] Procedimento procedimento)
        {
            try
            {    
                _database.tb_procedimento.Add(procedimento);
                await _database.SaveChangesAsync();
                
                return Created("Procedimento salvo com sucesso", procedimento);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao salvar o procedimento.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetProcedimento(int id)
        {
            if (id <= 0)
                return BadRequest("ID de procura inválido.");   

            try
            {    
                var procedimento = await _database.tb_procedimento.FindAsync(id);

                if (procedimento == null)
                    return NotFound("Procedimento não encontrado!");
            

                return Ok(procedimento);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o procedimento.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProcedimento(int id, [FromBody] Procedimento procedimento)
        {
            if (id != procedimento.Id)
                return BadRequest("ID da URL e do corpo não coincidem.");

            try
            {
                var procedimentoOld = await _database.tb_procedimento.FindAsync(id);

                if (procedimentoOld == null)
                    return NotFound("Consulta não encontrada.");

                procedimentoOld.Nome        = procedimento.Nome;
                procedimentoOld.Observacoes = procedimento.Observacoes;
                procedimentoOld.DentistaId  = procedimento.DentistaId;
                procedimentoOld.Valor       = procedimento.Valor;

                await _database.SaveChangesAsync();

                return Ok("Consulta atualizada com sucesso.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o procedimento.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcedimento(int id)
        {
            if (id <= 0)
                return BadRequest("ID Inválido.");

            try
            {
                var procedimento = await _database.tb_procedimento.FindAsync(id);

                if (procedimento == null)
                    return NotFound("Consulta não encontrada!");
                
                _database.tb_procedimento.Remove(procedimento);
                await _database.SaveChangesAsync();
                return Ok("Consulta deletada com sucesso!");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o procedimento.");
            }
        }
    }
}
