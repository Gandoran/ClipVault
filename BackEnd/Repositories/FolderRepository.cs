using LiteDB;
using BackEnd.Models;

namespace BackEnd.Repositories
{
    public class FolderRepository
    {
        private readonly ILiteCollection<FolderItem> _collection;

        public FolderRepository(LiteDbContext context)
        {
            _collection = context.Database.GetCollection<FolderItem>("folders");
        }

        public IEnumerable<FolderItem> GetAll()
        {
            return _collection.FindAll().OrderBy(x => x.CreatedAt).ToList();
        }

        public FolderItem Create(string name)
        {
            var folder = new FolderItem { Name = name };
            _collection.Insert(folder);
            return folder;
        }
        public void Delete(string id)
        {
            _collection.Delete(id);
        }
    }
}