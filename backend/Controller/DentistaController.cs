using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using AutoMapper;

namespace SistemaOdontologico.Controllers
{
    [ApiController]
    [Route("dentista/")]
    public class DentistaController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public DentistaController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DentistaDTO>>> GetDentistas()
        {
            var dentistas = await _database.tb_dentista.ToListAsync();
            if (dentistas == null || !dentistas.Any())
            {
                return NotFound("Nenhum dentista cadastrado!");
            }

            var dentistasDTO = _mapper.Map<List<DentistaDTO>>(dentistas);
            return Ok(dentistasDTO);
        }

        [HttpPost]
        public async Task<ActionResult> AddDentista([FromBody] DentistaPostDTO dentistaPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dados do dentista inválidos!");
            }

            var dentista = _mapper.Map<Dentista>(dentistaPost);

            _database.tb_dentista.Add(dentista);
            await _database.SaveChangesAsync();

            var dentistaDTO = _mapper.Map<DentistaDTO>(dentista);
            return Created("Dentista criado com sucesso", dentistaDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DentistaDTO>> GetDentista(long id)
        {
            var dentista = await _database.tb_dentista.FindAsync(id);

            if (dentista == null)
            {
                return NotFound("Dentista não encontrado!");
            }

            var dentistaDTO = _mapper.Map<DentistaDTO>(dentista);

            return Ok(dentistaDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDentista(long id, [FromBody] DentistaPutDTO dentista)
        {
            var dentistaExistente = await _database.tb_dentista.FindAsync(id);

            if (dentistaExistente == null)
            {
                return NotFound("Dentista não encontrado!");
            }

            dentistaExistente.Nome = dentista.Nome;
            dentistaExistente.Especialidade = dentista.Especialidade;
            dentistaExistente.CRO = dentista.CRO;
            dentistaExistente.Telefone = dentista.Telefone;
            dentistaExistente.Email = dentista.Email;

            await _database.SaveChangesAsync();
            return Ok("Dentista atualizado com sucesso!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDentista(long id)
        {
            var dentista = await _database.tb_dentista.FindAsync(id);

            if (dentista == null)
            {
                return NotFound("Dentista não encontrado!");
            }

            _database.tb_dentista.Remove(dentista);
            await _database.SaveChangesAsync();
            return Ok("Dentista deletado com sucesso!");
        }
    }
}