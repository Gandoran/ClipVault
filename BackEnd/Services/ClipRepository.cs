using LiteDB;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class ClipRepository
    {
        private readonly ILiteCollection<ClipItem> _collection;
        public ClipRepository(LiteDbContext context)
        {
            _collection = context.Database.GetCollection<ClipItem>("clips");
        }

        public void Insert(ClipItem clip) => _collection.Insert(clip);

        public IEnumerable<ClipItem> GetAll()
        {
            return _collection.FindAll()
                              .OrderByDescending(x => x.IsPinned)
                              .ThenByDescending(x => x.CreatedAt)
                              .ToList();
        }

        public void Delete(string id) => _collection.Delete(id);

        public void TogglePin(string id)
        {
            var clip = _collection.FindById(id);
            if (clip != null)
            {
                clip.IsPinned = !clip.IsPinned;
                _collection.Update(clip);
            }
        }

        public void UpdateContent(string id, string newContent)
        {
            var clip = _collection.FindById(id);
            if (clip != null)
            {
                clip.Content = newContent;
                _collection.Update(clip);
            }
        }
    }
}