using LiteDB;

namespace BackEnd.Models
{
    public class ClipItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Content { get; set; } = string.Empty;
        public string Type { get; set; } = "Text";
        public string SourceApp { get; set; } = "Unknown";
        public List<string> Tags { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}