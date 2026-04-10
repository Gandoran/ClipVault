using System.Text.Json;
using BackEnd.Models;

namespace BackEnd.Services
{
    public class FolderController
    {
        private readonly FolderRepository _folderRepo;
        private readonly ClipRepository _clipRepo;
        private readonly Action<string, object> _sendToReact;
        public FolderController(FolderRepository folderRepo, ClipRepository clipRepo, Action<string, object> sendToReact)
        {
            _clipRepo = clipRepo;
            _folderRepo = folderRepo;
            _sendToReact = sendToReact;
        }
        public Task GetAllFolders(JsonElement root)
        {
            _sendToReact("ALL_FOLDERS_LOADED", _folderRepo.GetAll());
            return Task.CompletedTask;
        }
        public Task CreateFolder(JsonElement root)
        {
            var name = root.GetProperty("payload").GetString() ?? "Nuova Cartella";
            _folderRepo.Create(name);
            _sendToReact("ALL_FOLDERS_LOADED", _folderRepo.GetAll());
            return Task.CompletedTask;
        }
        public Task DeleteFolder(JsonElement root)
        {
            var id = root.GetProperty("payload").GetString();
            if (id!=null)
            {
                _clipRepo.GetAll(id).ToList().ForEach(item => _clipRepo.Delete(item.Id));
                _folderRepo.Delete(id);
                _sendToReact("ALL_FOLDERS_LOADED", _folderRepo.GetAll());
                _sendToReact("All_CLIPS_LOADED", _clipRepo.GetAll());
            }
            return Task.CompletedTask;
        }
    }
}