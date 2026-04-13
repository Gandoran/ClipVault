using BackEnd.Controllers;
using BackEnd.Managers;
using BackEnd.Models;
using BackEnd.Repositories;
using Photino.NET;
using System.Text.Json;

namespace BackEnd.Services
{
    public class MessageRouter
    {
        private readonly PhotinoWindow _window;
        private readonly Dictionary<string,Func<JsonElement, Task>> _commandHandlers;
        public MessageRouter(PhotinoWindow window,ClipRepository clipRepo,FolderRepository folderRepo,FolderManager folderManager,ClipboardMonitorService monitorService,TagAnalyzerService tagAnalyzerService)
        {
            _window = window;
            var clipController = new ClipController(clipRepo, monitorService, SendToReact);
            var folderController = new FolderController(folderRepo,clipRepo,folderManager,SendToReact);
            _commandHandlers = new Dictionary<string, Func<JsonElement, Task>>
            {
                { "GET_ALL_CLIPS", clipController.GetAllClips },
                { "DELETE_CLIP", clipController.DeleteClip },
                { "COPY_CLIP", clipController.CopyClip },
                { "TOGGLE_PIN", clipController.TogglePin },
                { "UPDATE_CLIP_CONTENT", clipController.UpdateClipContent },
                { "GET_ALL_FOLDERS", folderController.GetAllFolders },
                { "CREATE_FOLDER", folderController.CreateFolder },
                { "MOVE_CLIP", clipController.MoveClip },
                { "DELETE_FOLDER", folderController.DeleteFolder },
                { "MULTIPLE_CLIPS_DELETE" ,clipController.MultipleDelete},
            };
            monitorService.OnClipboardChanged += (content, type, sourceApp) => 
            {
                var tags = tagAnalyzerService.Analyze(content, type, sourceApp);
                var newClip = new ClipItem { Content = content, Type = type, SourceApp = sourceApp, Tags=tags };
                clipRepo.Insert(newClip);
                SendToReact("NEW_CLIP", newClip);
            };
        }
        public void RouteMessage(string rawJson)
        {
            Task.Run(async () =>
            {
                try
                {
                    using var doc = JsonDocument.Parse(rawJson);
                    var root = doc.RootElement;
                    var command = root.GetProperty("command").GetString();
                    if (!string.IsNullOrEmpty(command) && _commandHandlers.TryGetValue(command, out var handler)) await handler(root);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[ERRORE IPC]: {ex.Message}");
                }
            });
        }
        private void SendToReact(string type, object data)
        {
            var response = JsonSerializer.Serialize(new { type = type, data = data });
            _window.SendWebMessage(response);
        }
    }
}