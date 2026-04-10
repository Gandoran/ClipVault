using BackEnd.Repositories;

namespace BackEnd.Managers
{
    public class FolderManager
    {
        private readonly FolderRepository _folderRepo;
        private readonly ClipRepository _clipRepo;

        public FolderManager(FolderRepository folderRepo, ClipRepository clipRepo)
        {
            _folderRepo = folderRepo;
            _clipRepo = clipRepo;
        }

        public void DeleteFolderCascading(string folderId)
        {
            var clipsToDelete = _clipRepo.GetAll(folderId).ToList();
            _clipRepo.GetAll(folderId).ToList().ForEach(item => _clipRepo.Delete(item.Id));
            _folderRepo.Delete(folderId);
        }
    }
}