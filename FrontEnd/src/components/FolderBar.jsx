import {FolderCreator} from './folder/FolderCreator';
import {FolderItem} from './folder/FolderItem';

export function FolderBar({ folders, onCreateFolder, onDropClip, onDeleteFolder, selectedFolderId, onSelectFolder }) {
  return (
    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px', borderBottom: '1px solid #333' }}>
      <FolderCreator onCreateFolder={onCreateFolder} />
      {folders?.map(folder => (
        <FolderItem 
          key={folder.Id}
          folder={folder}
          isSelected={selectedFolderId === folder.Id}
          onSelect={onSelectFolder}
          onDropClip={onDropClip}
          onDelete={onDeleteFolder}
        />
      ))}
    </div>
  );
}