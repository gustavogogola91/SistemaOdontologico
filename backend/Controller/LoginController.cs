using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaOdontologico.Data;

namespace backend.Controller
{
    [ApiController]
    [Route("login/")]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IEncryptService _hasher;
        private IJwtService _jwtService;


        public LoginController(AppDbContext database, IEncryptService hasher, IJwtService jwtService)
        {
            _database = database;
            _hasher = hasher;
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Login login)
        {
            try
            {
                var funcionario = await _database.tb_funcionario
                                .FirstOrDefaultAsync(f => f.Username == login.Username);

                if (funcionario != null && _hasher.CheckPassword(login.Senha, funcionario.Senha))
                {
                    var token = _jwtService.GenerateToken(funcionario.Username, "funcionario");
                    return Ok(new { token = token });
                }


                var dentista = await _database.tb_dentista
                                .FirstOrDefaultAsync(d => d.Username == login.Username);

                if (dentista != null && _hasher.CheckPassword(login.Senha, dentista.Senha))
                {
                    var token = _jwtService.GenerateToken(dentista.Username, "dentista");
                    return Ok(new { token = token });
                }

                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

    }
}