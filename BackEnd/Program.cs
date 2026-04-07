using Photino.NET;
using BackEnd.Services;

namespace BackEnd
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var window = new PhotinoWindow()
                .SetTitle("ClipVault")
                .SetUseOsDefaultSize(false)
                .SetSize(400, 500)
                .Center();
            var dbService = new DatabaseService();
            var clipboardMonitor = new ClipboardMonitorService(dbService);
            var router = new MessageRouter(window, dbService, clipboardMonitor);
            var cts = new CancellationTokenSource();
            _ = clipboardMonitor.StartMonitoringAsync(cts.Token);
            window.RegisterWebMessageReceivedHandler((object? sender, string message) =>
            {
                router.RouteMessage(message);
            });
            window.Load("http://localhost:5173");
            window.WaitForClose();
            cts.Cancel();
        }
    }
}