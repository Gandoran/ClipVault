namespace BackEnd.Services
{
    public interface IOsClipboardService
    {
        string GetText();
        string GetImageAsBase64();
        void SetText(string text);
        void SetImageFromBase64(string base64String);
    }
}