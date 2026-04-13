namespace BackEnd.TagRules
{
    public class CodeRule : ITagRule
    {
        public string? Evaluate(string content, string type, string sourceApp)
        {
            string app = sourceApp.ToLower();
            if (app.Contains("code") || app.Contains("idea") || app.Contains("rider") || app.Contains("devenv") || app.Contains("studio") || app.Contains("notepad++")) return "code";
            int codeMarkers = 0;
            if (content.Contains("{") && content.Contains("}")) codeMarkers++;
            if (content.Contains("</") && content.Contains(">")) codeMarkers++;
            if (content.Contains("function ") || content.Contains("class ") || content.Contains("const ") || content.Contains("var ")) codeMarkers++;
            if (content.Contains("=>") || content.Contains("==") || content.Contains("!=")) codeMarkers++;
            return codeMarkers >= 2 ? "code" : null;
        }
    }
}