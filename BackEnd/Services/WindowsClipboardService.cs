using System.Drawing.Imaging;

namespace BackEnd.Services
{
    public class WindowsClipboardService : IOsClipboardService
    {
        public string GetText()
        {
            string text = string.Empty;
            RunOnStaThread(() => {
                if (Clipboard.ContainsText()) text = Clipboard.GetText();
            });
            return text;
        }
        public string GetImageAsBase64()
        {
            string base64 = string.Empty;
            RunOnStaThread(() => {
                if (Clipboard.ContainsImage())
                {
                    using Image ?img = Clipboard.GetImage();
                    if (img != null)
                    {
                        using var ms = new MemoryStream();
                        img.Save(ms, ImageFormat.Png);
                        base64 = "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
                    }
                }
            });
            return base64;
        }
        public void SetText(string text)
        {
            RunOnStaThread(() => Clipboard.SetText(text));
        }

        public void SetImageFromBase64(string base64String)
        {
            RunOnStaThread(() => {
                var base64Data = base64String.Split(',')[1];
                byte[] imageBytes = Convert.FromBase64String(base64Data);
                using var ms = new MemoryStream(imageBytes);
                using Image img = Image.FromStream(ms);
                Clipboard.SetImage(img);
            });
        }
        private void RunOnStaThread(Action action)
        {
            var thread = new Thread(() => {
                try { action(); } catch { }
            });
            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
            thread.Join();
        }
    }
}