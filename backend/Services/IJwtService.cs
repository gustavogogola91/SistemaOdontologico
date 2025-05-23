namespace backend.Services
{
    public interface IJwtService
    {
        string GenerateToken(string username, string userType);
    }
}