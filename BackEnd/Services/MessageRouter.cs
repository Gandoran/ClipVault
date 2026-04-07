using Photino.NET;
using System.Text.Json;

namespace BackEnd.Services
{
    public class MessageRouter
    {
        private readonly PhotinoWindow _window;
        private readonly DatabaseService _dbService;
        private readonly ClipboardMonitorService _clipboardMonitorService;
        public MessageRouter(PhotinoWindow window, DatabaseService dbService, ClipboardMonitorService monitorService)
        {
            _window = window;
            _dbService = dbService;
            _clipboardMonitorService = monitorService;
            monitorService.OnClipCopied += (newClip) => 
            {
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
                    var command = doc.RootElement.GetProperty("command").GetString();
                    switch (command)
                    {
                        case "GET_ALL_CLIPS":
                            var allClips = _dbService.GetAllClipsOnCreationOrder();
                            SendToReact("ALL_CLIPS_LOADED", allClips);
                            break;
                        case "DELETE_CLIP":
                            // React ci invierà l'ID come stringa nel payload
                            var idToDelete = doc.RootElement.GetProperty("payload").GetString();
                            if (idToDelete != null)
                            {
                                _dbService.DeleteClip(idToDelete);
                            }
                            break;

                        case "COPY_CLIP":
                            // React ci invierà il testo da copiare
                            var textToCopy = doc.RootElement.GetProperty("payload").GetString();
                            if (textToCopy != null)
                            {
                                await _clipboardMonitorService.CopyToClipboardSilentlyAsync(textToCopy);
                            }
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