namespace BackEnd.TagRules
{
    public interface ITagRule
    {
        string? Evaluate(string content, string type, string sourceApp);
    }
}