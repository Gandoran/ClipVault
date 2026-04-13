using System.Text.RegularExpressions;

namespace BackEnd.TagRules
{
    public class PasswordRule : ITagRule
    {
        public string? Evaluate(string content, string type, string sourceApp)
        {
            string trimmed = content.Trim();
            if (trimmed.Length >= 8 && trimmed.Length <= 64 && !trimmed.Contains(" ") && !trimmed.Contains("http") && !trimmed.Contains("@"))
            {
                bool hasNumber = Regex.IsMatch(trimmed, @"[0-9]");
                bool hasLetter = Regex.IsMatch(trimmed, @"[a-zA-Z]");
                bool hasSpecial = Regex.IsMatch(trimmed, @"[^a-zA-Z0-9]");
                if ((hasNumber && hasLetter) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial))return "password";
            }
            return null;
        }
    }
}