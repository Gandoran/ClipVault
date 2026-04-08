using System.Text.Json;

namespace BackEnd.Services
{
    public class ClipController
    {
        private readonly ClipRepository _repository;
        private readonly ClipboardMonitorService _monitorService;
        private readonly Action<string,object> _sendToReact;
        public ClipController(ClipRepository repository,ClipboardMonitorService monitorService,Action<string, object> sendToReact)
        {
            _repository = repository;
            _monitorService = monitorService;
            _sendToReact = sendToReact;
        }
        public Task GetAllClips(JsonElement root)
        {
            var allClips = _repository.GetAll();
            _sendToReact("ALL_CLIPS_LOADED", allClips);
            return Task.CompletedTask;
        }
        public Task DeleteClip(JsonElement root)
        {
            var idToDelete = root.GetProperty("payload").GetString();
            if (idToDelete != null) _repository.Delete(idToDelete);
            return Task.CompletedTask;
        }
        public async Task CopyClip(JsonElement root)
        {
            var textToCopy = root.GetProperty("payload").GetString();
            if (textToCopy != null) await _monitorService.CopyToClipboardSilentlyAsync(textToCopy);
        }
        public Task TogglePin(JsonElement root)
        {
            var idToPin = root.GetProperty("payload").GetString();
            if (idToPin != null)
            {
                _repository.TogglePin(idToPin);
                var updatedClips = _repository.GetAll();
                _sendToReact("ALL_CLIPS_LOADED", updatedClips);
            }
            return Task.CompletedTask;
        }

        public Task UpdateClipContent(JsonElement root)
        {
            if (root.TryGetProperty("payload", out var updateData))
            {
                var id = updateData.GetProperty("id").GetString();
                var content = updateData.GetProperty("content").GetString();
                if (!string.IsNullOrEmpty(id) && content != null) _repository.UpdateContent(id, content);
            }
            return Task.CompletedTask;
        }
    }
}