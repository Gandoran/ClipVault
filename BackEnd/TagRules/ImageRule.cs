namespace BackEnd.TagRules
{
    public class ImageRule : ITagRule
    {
        public string? Evaluate(string content, string type, string sourceApp)
        {
            return type == "Image" ? "image" : null;
        }
    }
}