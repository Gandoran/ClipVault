using LiteDB;

namespace BackEnd.Services
{
    public class LiteDbContext : IDisposable
    {
        public LiteDatabase Database { get; }
        public LiteDbContext(string dbPath = "data/ClipVault.db")
        {
            Database = new LiteDatabase(dbPath);
        }
        public void Dispose()
        {
            Database?.Dispose();
        }
    }
}