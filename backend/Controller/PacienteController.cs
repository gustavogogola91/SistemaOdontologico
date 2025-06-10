using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using AutoMapper;

namespace SistemaOdontologico.Controllers
{
    [ApiController]
    [Route("paciente/")]
    public class PacienteController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public PacienteController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PacienteDTO>>> GetPacientes()
        {
            var pacientes = await _database.tb_paciente.ToListAsync();
            if (pacientes == null || !pacientes.Any())
            {
                return NotFound("Nenhum paciente cadastrado!");
            }

            var pacientesDTO = _mapper.Map<List<PacienteDTO>>(pacientes);
            return Ok(pacientesDTO);
        }

        [HttpPost]
        public async Task<ActionResult> AddPaciente([FromBody] PacientePostDTO pacientePost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Paciente inválido!");
            }

            var paciente = _mapper.Map<Paciente>(pacientePost);

            _database.tb_paciente.Add(paciente);
            await _database.SaveChangesAsync();
            return Created("Paciente criado com sucesso", paciente);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PacienteDTO>> GetPaciente(long id)
        {
            var paciente = await _database.tb_paciente.FindAsync(id);

            if (paciente == null)
            {
                return NotFound("Paciente não encontrado!");
            }

            var pacienteDTO = _mapper.Map<PacienteDTO>(paciente);

            return Ok(pacienteDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaciente(long id, [FromBody] PacientePutDTO paciente)
        {
            var pacienteExistente = await _database.tb_paciente.FindAsync(id);

            if (pacienteExistente == null)
            {
                return NotFound("Paciente não encontrado!");
            }

            pacienteExistente.Nome = paciente.Nome;
            pacienteExistente.Telefone = paciente.Telefone;
            pacienteExistente.Email = paciente.Email;
            pacienteExistente.CPF = paciente.CPF;
            pacienteExistente.Endereco = paciente.Endereco;
            pacienteExistente.Convenio = paciente.Convenio;

            await _database.SaveChangesAsync();
            return Ok("Informações do paciente atualizadas!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(long id)
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