using LiteDB;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class DatabaseService
    {
        private readonly string _dbPath = "data/ClipVault.db";
        public void InsertClip(ClipItem clip)
        {
            using var db = new LiteDatabase(_dbPath);
            var col = db.GetCollection<ClipItem>("clips");
            col.Insert(clip);
        }
        public IEnumerable<ClipItem> GetAllClipsOnCreationOrder()
        {
            using var db = new LiteDatabase(_dbPath);
            var col = db.GetCollection<ClipItem>("clips");
            return col.Query()
                      .OrderByDescending(x => x.CreatedAt)
                      .ToList();
        }
        public void DeleteClip(string id)
        {
            using var db = new LiteDatabase(_dbPath);
            var col = db.GetCollection<ClipItem>("clips");
            col.Delete(id);
        }
    }
}