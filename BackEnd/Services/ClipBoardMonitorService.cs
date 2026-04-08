using TextCopy;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class ClipboardMonitorService
    {
        private readonly ClipRepository _repository;
        private string _lastCopiedText = string.Empty;
        public event Action<ClipItem>? OnClipCopied;
        public ClipboardMonitorService(ClipRepository repository)
        {
            _repository = repository;
        }
        public async Task StartMonitoringAsync(CancellationToken cancellationToken)
        {
            _lastCopiedText = await ClipboardService.GetTextAsync() ?? string.Empty;
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    string currentText = await ClipboardService.GetTextAsync() ?? string.Empty;
                    if (!string.IsNullOrWhiteSpace(currentText) && currentText != _lastCopiedText)
                    {
                        _lastCopiedText = currentText;
                        string sourceApp = WindowTracker.GetActiveProcessName();
                        var newClip = new ClipItem
                        {
                            Content = currentText,
                            Type = "Text",
                            SourceApp = sourceApp
                        };
                        _repository.Insert(newClip);
                        OnClipCopied?.Invoke(newClip);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[Error Monitor]: {ex.Message}");
                }
                await Task.Delay(500, cancellationToken);
            }
        }
        //for when you copy from the app
        public async Task CopyToClipboardSilentlyAsync(string text)
        {
            _lastCopiedText = text; 
            await ClipboardService.SetTextAsync(text);
        }
    }
}