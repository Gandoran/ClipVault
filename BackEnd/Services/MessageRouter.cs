using Photino.NET;
using System.Text.Json;

namespace BackEnd.Services
{
    public class MessageRouter
    {
        private readonly PhotinoWindow _window;
        private readonly DatabaseService _dbService;
        public MessageRouter(PhotinoWindow window, DatabaseService dbService, ClipboardMonitorService monitorService)
        {
            _window = window;
            _dbService = dbService;
            monitorService.OnClipCopied += (newClip) => 
            {
                SendToReact("NEW_CLIP", newClip);
            };
        }

        public void RouteMessage(string rawJson)
        {
            Task.Run(() =>
            {
                try
                {
                    using var doc = JsonDocument.Parse(rawJson);
                    var command = doc.RootElement.GetProperty("command").GetString();
                    switch (command)
                    {
                        case "GET_ALL_CLIPS":
                            var allClips = _dbService.GetAllClipsOnCreationOrder();
                            SendToReact("ALL_CLIPS_LOADED", allClips);
                            break;
                    }
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