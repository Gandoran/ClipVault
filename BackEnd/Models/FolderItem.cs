namespace BackEnd.Models
{
    public class FolderItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = "Nuova Cartella";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}