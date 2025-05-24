using System.Security.Cryptography;

namespace backend.FileEncryptor
{
    public class FileEncryptorService : IFileEncryptorService
    {
        public void EncryptFile(string inputFile, string outputFile, string password)
        {
            using var aes = Aes.Create();

            using var keyDerivation = new Rfc2898DeriveBytes(
                password: password,
                saltSize: 16,
                iterations: 100_000,
                hashAlgorithm: HashAlgorithmName.SHA256
            );

            aes.Key = keyDerivation.GetBytes(32);
            aes.IV = keyDerivation.GetBytes(16);

            using var fsOut = new FileStream(outputFile, FileMode.Create, FileAccess.Write);
            fsOut.Write(keyDerivation.Salt, 0, keyDerivation.Salt.Length);
            fsOut.Write(aes.IV, 0, aes.IV.Length);

            using (var fsIn = new FileStream(inputFile, FileMode.Open, FileAccess.Read))
            using (var cryptoStream = new CryptoStream(fsOut, aes.CreateEncryptor(), CryptoStreamMode.Write))
            {
                fsIn.CopyTo(cryptoStream);
            }

            File.Delete(inputFile);
        }

        public void DecryptFile(string inputFile, string outputFile, string password)
        {
            using var fsIn = new FileStream(inputFile, FileMode.Open, FileAccess.Read);

            byte[] salt = new byte[16], iv = new byte[16];
            fsIn.Read(salt, 0, salt.Length);
            fsIn.Read(iv, 0, iv.Length);

            using var keyDerivation = new Rfc2898DeriveBytes(
                password: password,
                salt,
                iterations: 100_000,
                hashAlgorithm: HashAlgorithmName.SHA256);
            using var aes = Aes.Create();
            aes.Key = keyDerivation.GetBytes(32);
            aes.IV = iv;

            using var cryptoStream = new CryptoStream(
                fsIn,
                aes.CreateDecryptor(),
                CryptoStreamMode.Read
            );

            using var fsOut = new FileStream(outputFile, FileMode.Create, FileAccess.Write);
            cryptoStream.CopyTo(fsOut);
        }
    }
}