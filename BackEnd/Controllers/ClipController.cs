using System.Text.Json;
using BackEnd.Repositories;
using BackEnd.Services;

namespace BackEnd.Controllers
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
            string? folderId = null; 
            if (root.TryGetProperty("payload", out var payload) && payload.ValueKind == JsonValueKind.String) folderId = payload.GetString();
            var allClips = _repository.GetAll(folderId);
            _sendToReact("ALL_CLIPS_LOADED", allClips);
            return Task.CompletedTask;
        }
        public Task DeleteClip(JsonElement root)
        {
            var idToDelete = root.GetProperty("payload").GetString();
            if (idToDelete != null) _repository.Delete(idToDelete);
            return Task.CompletedTask;
        }
        public Task CopyClip(JsonElement root)
        {
            var content = root.GetProperty("payload").GetProperty("content").GetString();
            var type = root.GetProperty("payload").GetProperty("type").GetString();
            if (content != null && type != null) _monitorService.CopyToClipboardSilently(content, type);
            return Task.CompletedTask;
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
        public Task MoveClip(JsonElement root) {
            var payload = root.GetProperty("payload");
            var clipId = payload.GetProperty("clipId").GetString();
            var folderId = payload.GetProperty("folderId").GetString();
            if(clipId != null) _repository.MoveToFolder(clipId, folderId);
            return Task.CompletedTask;
        }
        public Task MultipleDelete(JsonElement root)
        {
            if(root.TryGetProperty("payload",out var payload)&& payload.ValueKind == JsonValueKind.Array)
            {
                var id = payload.EnumerateArray().Select(x=>x.GetString()).Where(x=>x!=null).ToList();
                if(id.Any()) _repository.MultipleDelete(id!);
            }
            return Task.CompletedTask;
        }
    }
}