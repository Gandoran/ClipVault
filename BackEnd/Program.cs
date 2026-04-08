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
            using var dbContext = new LiteDbContext();
            var clipRepository = new ClipRepository(dbContext);
            var clipboardMonitor = new ClipboardMonitorService(clipRepository);
            var router = new MessageRouter(window, clipRepository, clipboardMonitor);
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