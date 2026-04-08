using Photino.NET;
using System.Text.Json;

namespace BackEnd.Services
{
    public class MessageRouter
    {
        private readonly PhotinoWindow _window;
        private readonly Dictionary<string,Func<JsonElement, Task>> _commandHandlers;

        public MessageRouter(PhotinoWindow window,ClipRepository dbService,ClipboardMonitorService monitorService)
        {
            _window = window;
            var clipController = new ClipController(dbService, monitorService, SendToReact);
            _commandHandlers = new Dictionary<string, Func<JsonElement, Task>>
            {
                { "GET_ALL_CLIPS", clipController.GetAllClips },
                { "DELETE_CLIP", clipController.DeleteClip },
                { "COPY_CLIP", clipController.CopyClip },
                { "TOGGLE_PIN", clipController.TogglePin },
                { "UPDATE_CLIP_CONTENT", clipController.UpdateClipContent }
            };

            // Mantieniamo l'ascolto per i nuovi clip
            monitorService.OnClipCopied += (newClip) => SendToReact("NEW_CLIP", newClip);
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