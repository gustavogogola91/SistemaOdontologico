using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using AutoMapper;
using backend.Models;

namespace Backend.Controller
{
    [ApiController]
    [Route("consulta/")]
    public class ConsultaController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public ConsultaController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConsultaDTO>>> GetConsultas()
        {
            var consultas = await _database.tb_consulta.Include(c => c.Paciente).Include(c => c.Dentista).Include(c => c.Procedimentos).ThenInclude(p => p.Procedimento).ToListAsync();
            if (consultas == null || !consultas.Any())
            {
                return NotFound("Sem Consultas cadastradas!");
            }

            var consultasDTO = _mapper.Map<List<ConsultaDTO>>(consultas);
            return Ok(consultasDTO);
        }

        [HttpPost]
        public async Task<ActionResult> AddConsulta([FromBody] ConsultaPostDTO consultaPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Consulta inválida!");
            }

            var consulta = _mapper.Map<Consulta>(consultaPost);

            if (consultaPost.ListaProcedimentos != null)
            {
                foreach (ProocedimentoConsultaPostDTO procedimento in consultaPost.ListaProcedimentos)
                {
                    var p = new ProcedimentoConsulta(procedimento.ProcedimentoId);

                    consulta.Procedimentos!.Add(p);
                }
            }


            _database.tb_consulta.Add(consulta);
            await _database.SaveChangesAsync();

            var consultaDTO = _mapper.Map<ConsultaDTO>(consulta);
            return Created("Consulta criada com sucesso", consultaDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConsultaDTO>> GetConsultas(int id)
        {
            var consulta = await _database.tb_consulta.Include(c => c.Paciente).Include(c => c.Dentista).Include(c => c.Procedimentos).ThenInclude(p => p.Procedimento).FirstOrDefaultAsync(c => c.Id == id);

            if (consulta == null)
            {
                return NotFound("Consulta não encontrada!");
            }

            var consultaDTO = _mapper.Map<Consulta>(consulta);

            return Ok(consultaDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateConsulta(int id, [FromBody] ConsultaPutDTO consulta)
        {
            var consultaExistente = await _database.tb_consulta.FindAsync(id);

            if (consultaExistente == null)
            {
                return NotFound("Consulta não encontrada!");
            }

            consultaExistente.DentistaId = consulta.DentistaId;
            consultaExistente.Observacoes = consulta.Observacoes;
            consultaExistente.Convenio = consulta.Convenio;

            await _database.SaveChangesAsync();
            return Ok("Informações da Consulta foram atualizadas!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            var consulta = await _database.tb_consulta.FindAsync(id);

            if (consulta == null)
            {
                return NotFound("Consulta não encontrada!");
            }

            _database.tb_consulta.Remove(consulta);
            await _database.SaveChangesAsync();
            return Ok("Consulta deletada com sucesso!");
        }


    }
}
