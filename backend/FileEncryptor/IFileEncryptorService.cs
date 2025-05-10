namespace backend.FileEncryptor
{
    public interface IFileEncryptorService
    {
        void EncryptFile(string inputFile, string outputFile, string password);

        void DecryptFile(string inputFile, string outputFile, string password);
    }
}