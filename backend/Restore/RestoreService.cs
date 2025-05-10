using System.Diagnostics;
using backend.FileEncryptor;

namespace backend.Restore
{
    public class RestoreService : IRestoreService
    {

        private readonly ILogger<RestoreService> _logger;
        private readonly IConfiguration _config;
        private readonly IFileEncryptorService _fileEncryptor;
        public RestoreService(ILogger<RestoreService> logger, IConfiguration config, IFileEncryptorService fileEncryptor)
        {
            _logger = logger;
            _config = config;
            _fileEncryptor = fileEncryptor;

        }

        public async Task ExecutaRestoreAsync(string nomeArquivoEncrypt)
        {
            var backupDir = _config["Backup:Directory"];
            var caminhoCompletoBackupEncrypt = Path.Combine(backupDir!, nomeArquivoEncrypt);

            var tempDirectory = _config["Backup:TempDirectory"];
            var caminhoCompletoTempBackup = Path.Combine(tempDirectory!, Path.ChangeExtension(nomeArquivoEncrypt, ".dump"));

            Directory.CreateDirectory(tempDirectory!);

            if (!File.Exists(caminhoCompletoBackupEncrypt))
            {
                _logger.LogError($"[Restore] Arquivo de backup não encontrado: {caminhoCompletoBackupEncrypt}");
                return;
            }

            _fileEncryptor.DecryptFile(caminhoCompletoBackupEncrypt, caminhoCompletoTempBackup, _config["Backup:EncryptionKey"]!);

            var psi = new ProcessStartInfo
            {
                FileName = _config["Backup:PgRestorePath"],
                Arguments = $"-U {_config["Backup:User"]} -h {_config["Backup:Host"]} -d {_config["Backup:Database"]} -c \"{caminhoCompletoTempBackup}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            psi.Environment["PGPASSWORD"] = _config["Backup:Password"];

            using var process = Process.Start(psi);
            await process!.WaitForExitAsync();

            var stdout = await process.StandardOutput.ReadToEndAsync();
            var stderr = await process.StandardError.ReadToEndAsync();
            _logger.LogInformation(stdout);
            if (process.ExitCode != 0)
                _logger.LogError(stderr);


            if (process.ExitCode == 0 || process.ExitCode == 1)
            {
                Console.WriteLine($"[Restore] Restauração concluída com sucesso.");
            }
            else
            {
                Console.WriteLine("[Restore] Erro durante a restauração com código: {0}", process.ExitCode);
            }
        }

        public List<string> ListAvaibleBackups()
        {
            var backupDir = _config["Backup:Directory"];

            if (!Directory.Exists(backupDir))
            {
                return new List<string>();
            }

            var files = Directory.GetFiles(backupDir).Select(Path.GetFileName)
            .OrderByDescending(name => name).ToList();

            return files!;
        }
    }
}