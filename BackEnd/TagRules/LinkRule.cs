using System.Text.RegularExpressions;

namespace BackEnd.TagRules
{
    public class LinkRule : ITagRule
    {
        public string? Evaluate(string content, string type, string sourceApp)
        {
            var isLink = Regex.IsMatch(content.Trim(), @"^https?://[\w\-]+(\.[\w\-]+)+[/#?]?.*$");
            return isLink ? "link" : null;
        }
    }
}