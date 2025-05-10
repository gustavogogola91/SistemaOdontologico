
using System.Diagnostics;
using backend.FileEncryptor;

namespace backend.Backup
{
    public class BackupService : IBackupService
    {
        private readonly ILogger<BackupService> _logger;
        private readonly IConfiguration _config;
        private readonly IFileEncryptorService _fileEncryptor;

        public BackupService(ILogger<BackupService> logger, IConfiguration config, IFileEncryptorService fileEncryptor)
        {
            _logger = logger;
            _config = config;
            _fileEncryptor = fileEncryptor;
        }

        public async Task ExecutarBackupAsync()
        {
            var backupDir = _config["Backup:Directory"];
            var nomeArquivo = $"backup_{DateTime.UtcNow:ddMMyyyy_HHmmss}.dump";
            var nomeArquivoEncrypt = $"backup_{DateTime.Now:ddMMyyyy_HHmmss}.aes";
            var caminhoCompleto = Path.Combine(backupDir!, nomeArquivo);
            var caminhoCompletoEncrypt = Path.Combine(backupDir!, nomeArquivoEncrypt);

            Directory.CreateDirectory(backupDir!);

            var psi = new ProcessStartInfo
            {
                FileName = _config["Backup:PgDumpPath"],
                Arguments = $"-U {_config["Backup:User"]} -h {_config["Backup:Host"]} -Fc -b -v -f \"{caminhoCompleto}\" {_config["Backup:Database"]}",
                UseShellExecute = false,
                CreateNoWindow = true,
            };
            psi.Environment["PGPASSWORD"] = _config["Backup:Password"];

            using var process = Process.Start(psi);
            _logger.LogInformation("[Backup] backup iniciado");
            await process!.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                _logger.LogError("[Backup] backup falhou com código: {1}", process.ExitCode);
                return;
            }

            _logger.LogInformation("[Backup] Backup criado com sucesso: {path}", caminhoCompleto);

            _logger.LogInformation("[Encriptação] Iniciando encriptação do arquivo em: {path}", caminhoCompletoEncrypt);
            _fileEncryptor.EncryptFile(caminhoCompleto, caminhoCompletoEncrypt, _config["Backup:EncryptionKey"]!);
            _logger.LogInformation("[Encriptação] Encriptação concluída");

            const int maxBackups = 5;
            var arquivos = new DirectoryInfo(backupDir!).GetFiles("backup_*.aes").OrderBy(fi => fi.CreationTime).ToList();

            if (arquivos.Count > maxBackups)
            {
                var aExcluir = arquivos.Take(arquivos.Count - maxBackups);
                foreach (var fi in aExcluir)
                {
                    try
                    {
                        fi.Delete();
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Erro ao excluir backup antigo");
                    }
                }
            }
        }
    }
}