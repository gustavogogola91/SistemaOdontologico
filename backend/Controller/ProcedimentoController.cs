using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using backend.DTO;

namespace Backend.Controller
{
    [ApiController]
    [Route("procedimento/")]
    public class ProcedimentoController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public ProcedimentoController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcedimentoDTO>>> GetProcedimentos()
        {
            try
            {
                var procedimentos = await _database.tb_procedimento.Include(p => p.Dentista).ToListAsync();
                if (procedimentos == null || !procedimentos.Any())
                {
                    return NotFound("Sem Procedimentos cadastradas!");
                }

                var procedimentosDTO = _mapper.Map<List<ProcedimentoDTO>>(procedimentos);

                return Ok(procedimentosDTO);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("nome")]
        public async Task<ActionResult<IEnumerable<ProcedimentoNomeDTO>>> GetNomeProcedimentos()
        {
            try
            {
                var procedimentos = await _database.tb_procedimento.Include(p => p.Dentista).ToListAsync();
                if (procedimentos == null || !procedimentos.Any())
                {
                    return NotFound("Sem Procedimentos cadastradas!");
                }

                var procedimentosDTO = _mapper.Map<List<ProcedimentoNomeDTO>>(procedimentos);

                return Ok(procedimentosDTO);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProcedimentoDTO>> GetProcedimento(long id)
        {
            if (id <= 0)
                return BadRequest("ID de procura inválido.");

            try
            {
                var procedimento = await _database.tb_procedimento.FindAsync(id);

                if (procedimento == null)
                {
                    return NotFound("Procedimento não encontrado!");
                }

                var procedimentoDTO = _mapper.Map<ProcedimentoDTO>(procedimento);

                return Ok(procedimentoDTO);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o procedimento.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddProcedimento([FromBody] ProcedimentoPostDTO procedimentoPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var procedimento = _mapper.Map<Procedimento>(procedimentoPost);

                _database.tb_procedimento.Add(procedimento);
                await _database.SaveChangesAsync();

                var procedimentoDTO = _mapper.Map<ProcedimentoDTO>(procedimento);

                return Created("Procedimento salvo com sucesso", procedimentoDTO);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao salvar o procedimento.");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProcedimento(long id, [FromBody] ProcedimentoPutDTO procedimento)
        {
            if (id != procedimento.Id)
            {
                return BadRequest("ID da URL e do corpo não coincidem.");
            }

            try
            {
                var procedimentoOld = await _database.tb_procedimento.FindAsync(id);

                if (procedimentoOld == null)
                    return NotFound("Procedimento não encontrado.");

                procedimentoOld.Nome = procedimento.Nome;
                procedimentoOld.Observacoes = procedimento.Observacoes;
                procedimentoOld.DentistaId = procedimento.DentistaId;
                procedimentoOld.Valor = procedimento.Valor;

                await _database.SaveChangesAsync();

                return Ok("Consulta atualizada com sucesso.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro ao buscar o procedimento.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcedimento(long id)
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
