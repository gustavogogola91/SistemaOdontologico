using SistemaOdontologico.Models;
using SistemaOdontologico.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("consulta/")]
    public class ConsultaController : ControllerBase
    {
        private readonly AppDbContext _database;

        public ConsultaController(AppDbContext database)
        {
            _database = database;
        }
   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultas()
        {
            var consultas = await _database.tb_consulta.ToListAsync();
            if (consultas == null || !consultas.Any())
            {
                return NotFound("Sem Consultas cadastradas!");
            }
            return Ok(consultas);
        }
    
    [HttpPost]
    public async Task<ActionResult> AddConsulta([FromBody] Consulta consulta)
    {
        var verify = await _database.tb_consulta.FindAsync(consulta.Id);
        
        if (consulta == null)
        {
            return BadRequest("Consulta inválida!");
        } else if(verify != null) {
            return BadRequest("Já existe uma consulta com esse id!");
        }



        _database.tb_consulta.Add(consulta);
        await _database.SaveChangesAsync();
        return Created("Consulta criada com sucesso", consulta);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Consulta>> GetConsultas(int id)
    {
        var consulta = await _database.tb_consulta.FindAsync(id);

        if (consulta == null)
        {
            return NotFound("Consulta não encontrada!");
        }

        return Ok(consulta);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateConsulta(int id,[FromBody] Consulta consulta)
    {
        var consultaExistente = await _database.tb_consulta.FindAsync(id);

        if (consultaExistente == null)
        {
            return NotFound("Consulta não encontrada!");
        }

        consultaExistente.Paciente = consulta.Paciente;
        consultaExistente.Dentista = consulta.Dentista;
        consultaExistente.Procedimento = consulta.Procedimento;
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
