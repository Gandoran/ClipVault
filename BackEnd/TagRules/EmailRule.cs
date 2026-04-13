using System.Text.RegularExpressions;

namespace BackEnd.TagRules
{
    public class EmailRule : ITagRule
    {
        public string? Evaluate(string content, string type, string sourceApp)
        {
            var isEmail = Regex.IsMatch(content.Trim(), @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return isEmail ? "email" : null;
        }
    }
}