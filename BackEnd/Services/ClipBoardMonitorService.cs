using BackEnd.Models;

namespace BackEnd.Services
{
    public class ClipboardMonitorService
    {
        private readonly ClipRepository _repository;
        private readonly IOsClipboardService _clipboardService;
        private string _lastCopiedData = string.Empty;
        public event Action<ClipItem>? OnClipCopied;

        public ClipboardMonitorService(ClipRepository repository, IOsClipboardService clipboardService)
        {
            _repository = repository;
            _clipboardService = clipboardService;
        }

        public async Task StartMonitoringAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    string currentText = _clipboardService.GetText();
                    if (!string.IsNullOrWhiteSpace(currentText) && currentText != _lastCopiedData) SaveAndNotify(currentText, "Text");
                    else
                    {
                        string currentImage = _clipboardService.GetImageAsBase64();
                        if (!string.IsNullOrWhiteSpace(currentImage) && currentImage != _lastCopiedData) SaveAndNotify(currentImage, "Image");
                    }
                }
                catch { }
                await Task.Delay(500, cancellationToken);
            }
        }
        private void SaveAndNotify(string content, string type)
        {
            _lastCopiedData = content;
            string sourceApp = WindowTracker.GetActiveProcessName();
            var newClip = new ClipItem { Content = content, Type = type, SourceApp = sourceApp };
            _repository.Insert(newClip);
            OnClipCopied?.Invoke(newClip);
        }
        //for when you copy from the app
        public void CopyToClipboardSilently(string content, string type)
        {
            _lastCopiedData = content;
            if (type == "Text") _clipboardService.SetText(content);
            else if (type == "Image") _clipboardService.SetImageFromBase64(content);
        }
    }
}