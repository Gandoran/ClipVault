using System.Text.Json;
using BackEnd.Managers;
using BackEnd.Repositories;

namespace BackEnd.Controllers
{
    public class FolderController
    {
        private readonly FolderRepository _folderRepo;
        private readonly ClipRepository _clipRepo;
        private readonly FolderManager _folderManager;
        private readonly Action<string, object> _sendToReact;
        public FolderController(FolderRepository folderRepo, ClipRepository clipRepo, FolderManager folderManager, Action<string,object> sendToReact)
        {
            _folderRepo = folderRepo;
            _clipRepo = clipRepo;
            _folderManager = folderManager;
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
            if (id != null)
            {
                _folderManager.DeleteFolderCascading(id);
                _sendToReact("ALL_FOLDERS_LOADED", _folderRepo.GetAll());
            }
            return Task.CompletedTask;
        }
    }
}