using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SistemaOdontologico.Controllers
{
    [ApiController]
    [Route("paciente/")]
    public class PacienteController : ControllerBase
    {
        private readonly AppDbContext _database;

        public PacienteController(AppDbContext database)
        {
            _database = database;
        }
   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
            var pacientes = await _database.tb_paciente.ToListAsync();
            if (pacientes == null || !pacientes.Any())
            {
                return NotFound("Nenhum paciente cadastrado!");
            }
            return Ok(pacientes);
        }
    
        [HttpPost]
        public async Task<ActionResult> AddPaciente([FromBody] Paciente paciente)
        {
            var verify = await _database.tb_paciente.FindAsync(paciente.Id);
            
            if (paciente == null)
            {
                return BadRequest("Paciente inválido!");
            } 
            else if(verify != null) 
            {
                return BadRequest("Já existe um paciente com esse ID!");
            }

            _database.tb_paciente.Add(paciente);
            await _database.SaveChangesAsync();
            return Created("Paciente criado com sucesso", paciente);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            var paciente = await _database.tb_paciente.FindAsync(id);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado!");
            }

            return Ok(paciente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaciente(int id, [FromBody] Paciente paciente)
        {
            var pacienteExistente = await _database.tb_paciente.FindAsync(id);

            if (pacienteExistente == null)
            {
                return NotFound("Paciente não encontrado!");
            }

            // Atualiza apenas os campos necessários
            pacienteExistente.Nome = paciente.Nome;
            pacienteExistente.DataNascimento = paciente.DataNascimento;
            pacienteExistente.Telefone = paciente.Telefone;
            pacienteExistente.Email = paciente.Email;
            pacienteExistente.CPF = paciente.CPF;
            pacienteExistente.Endereco = paciente.Endereco;

            await _database.SaveChangesAsync();
            return Ok("Informações do paciente atualizadas!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            var paciente = await _database.tb_paciente.FindAsync(id);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado!");
            }

            _database.tb_paciente.Remove(paciente);
            await _database.SaveChangesAsync();
            return Ok("Paciente deletado com sucesso!");
        }
    }
}