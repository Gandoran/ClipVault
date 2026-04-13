using Photino.NET;
using BackEnd.Services;
using BackEnd.Repositories;
using BackEnd.Managers;
using BackEnd.TagRules;

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
            var folderRepository = new FolderRepository(dbContext);
            var osClipboard = new WindowsClipboardService();
            var activeWindowService = new WindowsClipboardService();
            var folderManager = new FolderManager(folderRepository, clipRepository);
            var tagRules = new List<ITagRule> {new ImageRule(), new CodeRule(), new PasswordRule(), new LinkRule(), new EmailRule()};
            var tagAnalyzer = new TagAnalyzerService(tagRules);
            var clipboardMonitor = new ClipboardMonitorService(osClipboard);
            var router = new MessageRouter(window, clipRepository, folderRepository, folderManager, clipboardMonitor, tagAnalyzer);
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