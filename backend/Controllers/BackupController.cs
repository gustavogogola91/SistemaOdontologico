using backend.Backup;
using backend.Restore;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("backup")]
    public class BackupController : ControllerBase
    {
        private readonly IBackupService _backupService;
        private readonly IRestoreService _restoreService;

        public BackupController(IBackupService backupService, IRestoreService restoreService)
        {
            _backupService = backupService;
            _restoreService = restoreService;
        }

        [HttpGet("backups")]
        public async Task<ActionResult<IEnumerable<String>>> GetBackups()
        {
            try
            {
                var backups = _restoreService.ListAvaibleBackups();

                if (backups == null | backups!.Count == 0)
                {
                    return NotFound("Não existem backups disponíveis");
                }

                return Ok(backups);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("manual")]
        public async Task<ActionResult> BackupManual()
        {
            try
            {
                await _backupService.ExecutarBackupAsync();

                return Ok("Backup realizado com sucesso");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("restore")]
        public async Task<IActionResult> RetoreBackup([FromBody] string nomeArquivo)
        {
            try
            {
                await _restoreService.ExecutaRestoreAsync(nomeArquivo);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}