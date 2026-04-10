using BackEnd.Models;

namespace BackEnd.Services
{
    public class ClipboardMonitorService
    {
        private readonly IOsClipboardService _clipboardService;
        private string _lastCopiedData = string.Empty;
        public event Action<string,string,string>? OnClipboardChanged;
        public ClipboardMonitorService(IOsClipboardService clipboardService)
        {
            _clipboardService = clipboardService;
        }
        public async Task StartMonitoringAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    string currentText = _clipboardService.GetText();
                    if (!string.IsNullOrWhiteSpace(currentText) && currentText != _lastCopiedData) NotifyChange(currentText, "Text");
                    else
                    {
                        string currentImage = _clipboardService.GetImageAsBase64();
                        if (!string.IsNullOrWhiteSpace(currentImage) && currentImage != _lastCopiedData) NotifyChange(currentImage, "Image");
                    }
                }
                catch { }
                await Task.Delay(500, cancellationToken);
            }
        }
        private void NotifyChange(string content, string type)
        {
            _lastCopiedData = content;
            string sourceApp = WindowTracker.GetActiveProcessName();
            OnClipboardChanged?.Invoke(content, type, sourceApp);
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