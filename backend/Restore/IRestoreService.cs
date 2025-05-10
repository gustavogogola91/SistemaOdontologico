namespace backend.Restore
{
    public interface IRestoreService
    {
        public Task ExecutaRestoreAsync(string nomeArquivoEncrypt);
        public List<string> ListAvaibleBackups();
    }
}