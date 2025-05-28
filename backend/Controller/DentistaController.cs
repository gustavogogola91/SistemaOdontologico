using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Services;

namespace SistemaOdontologico.Controllers
{
    [ApiController]
    [Route("dentista/")]
    public class DentistaController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IEncryptService _hasher;

        public DentistaController(AppDbContext database, IEncryptService hasher)
        {
            _database = database;
            _hasher = hasher;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dentista>>> GetDentistas()
        {
            var dentistas = await _database.tb_dentista.ToListAsync();
            if (dentistas == null || !dentistas.Any())
            {
                return NotFound("Nenhum dentista cadastrado!");
            }
            return Ok(dentistas);
        }

        [HttpPost]
        public async Task<ActionResult> AddDentista([FromBody] Dentista dentista)
        {
            if (dentista == null)
            {
                return BadRequest("Dados do dentista inválidos!");
            }

            dentista.Senha = _hasher.HashUserPassword(dentista.Senha!);

            _database.tb_dentista.Add(dentista);
            await _database.SaveChangesAsync();
            return Created("Dentista criado com sucesso", dentista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dentista>> GetDentista(long id)
        {
            var dentista = await _database.tb_dentista.FindAsync(id);

            if (dentista == null)
            {
                return NotFound("Dentista não encontrado!");
            }

            return Ok(dentista);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDentista(long id, [FromBody] Dentista dentista)
        {
            var dentistaExistente = await _database.tb_dentista.FindAsync(id);

            if (dentistaExistente == null)
            {
                return NotFound("Dentista não encontrado!");
            }

            // Atualiza todas as propriedades
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