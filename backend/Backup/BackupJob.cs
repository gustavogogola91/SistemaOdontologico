using Quartz;

namespace backend.Backup
{
    public class BackupJob : IJob
    {

        private readonly IBackupService _backupService;
        private readonly ILogger<BackupJob> _logger;

        public BackupJob(IBackupService backupService, ILogger<BackupJob> logger)
        {
            _backupService = backupService;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            _logger.LogInformation("[Backup automatico] iniciando backup agendado em: {time}", DateTime.UtcNow);
            try {
                await _backupService.ExecutarBackupAsync();
            } catch (Exception ex) {
                _logger.LogError(ex, "[Backup automatico] Erro ao executar backup agendado");
            }
        }
    }
}