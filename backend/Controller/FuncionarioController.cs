using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaOdontologico.Data;

namespace backend.Controller
{
    [ApiController]
    [Route("funcionario/")]
    public class FucionarioController : ControllerBase
    {

        private readonly AppDbContext _database;
        private readonly IEncryptService _hasher;

        public FucionarioController(AppDbContext database, IEncryptService hasher)
        {
            _database = database;
            _hasher = hasher;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Funcionario>>> GetFuncionarios()
        {
            var funcionarios = await _database.tb_funcionario.ToListAsync();
            if (funcionarios == null || !funcionarios.Any())
            {
                return NotFound("Nenhum funcionario cadastrado!");
            }
            return Ok(funcionarios);
        }

        [HttpPost]
        public async Task<ActionResult> AddFuncionario([FromBody] Funcionario funcionario)
        {
            if (funcionario == null)
            {
                return BadRequest("Dados do funcionario inválidos!");
            }

            funcionario.Senha = _hasher.HashUserPassword(funcionario.Senha!);

            _database.tb_funcionario.Add(funcionario);
            await _database.SaveChangesAsync();
            return Created("Funcionario criado com sucesso", funcionario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Funcionario>> GetFuncionario(long id)
        {
            var funcionario = await _database.tb_funcionario.FindAsync(id);

            if (funcionario == null)
            {
                return NotFound("Funcionario não encontrado!");
            }

            return Ok(funcionario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFuncionario(long id, [FromBody] Funcionario funcionario)
        {
            var funcionarioExistente = await _database.tb_funcionario.FindAsync(id);

            if (funcionarioExistente == null)
            {
                return NotFound("Funcionario não encontrado!");
            }

            // Atualiza todas as propriedades
            funcionarioExistente.Nome = funcionario.Nome;
            funcionarioExistente.Username = funcionario.Username;
            funcionarioExistente.Telefone = funcionario.Telefone;
            funcionarioExistente.Email = funcionario.Email;

            await _database.SaveChangesAsync();
            return Ok("Funcionario atualizado com sucesso!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(long id)
        {
            var funcionario = await _database.tb_funcionario.FindAsync(id);

            if (funcionario == null)
            {
                return NotFound("Funcionario não encontrado!");
            }

            _database.tb_funcionario.Remove(funcionario);
            await _database.SaveChangesAsync();
            return Ok("Funcionario deletado com sucesso!");
        }

    }
}