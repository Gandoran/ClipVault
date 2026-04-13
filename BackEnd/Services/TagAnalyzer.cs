using BackEnd.TagRules;

namespace BackEnd.Services
{
    public class TagAnalyzerService
    {
        private readonly IEnumerable<ITagRule> _rules;
        public TagAnalyzerService(IEnumerable<ITagRule> rules)
        {
            _rules = rules;
        }

        public List<string> Analyze(string content, string type, string sourceApp)
        {
            foreach (var rule in _rules)
            {
                var tag = rule.Evaluate(content, type, sourceApp);
                if (!string.IsNullOrEmpty(tag)) return new List<string> { tag }; 
            }
            return new List<string>();
        }
    }
}