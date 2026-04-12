import { useState, useEffect } from 'react';
import { useAppManager } from './hooks/useAppManager';
import { ToastContainer } from 'react-toastify';
import { ClipModal, FolderBar, AppHeader, DeleteButton, ClipList, CommandPalette } from './components';

function App() {
  const { state, clipActions, folderActions } = useAppManager();
  const { isSelectionMode = false, selectedIds = [], clips = [] } = state;
  const [selectedClip, setSelectedClip] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayedClips = clips.filter(clip => {
    if(!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchContent = clip.Content?.toLowerCase().includes(query);
    const matchApp = clip.SourceApp?.toLowerCase().includes(query);
    return matchContent || matchApp;
  });

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <ToastContainer theme="dark" position="bottom-right" autoClose={300} hideProgressBar={true} />
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AppHeader isSelectionMode={isSelectionMode} selectedCount={selectedIds.length} totalCount={clips.length} onStartSelection={clipActions.startSelection} onStopSelection={clipActions.stopSelection} onSelectAll={clipActions.selectAll} onOpenSearch={() => setIsSearchOpen(true)}/>
      <FolderBar folders={state.folders} selectedFolderId={state.selectedFolderId} onCreateFolder={folderActions.create} onDeleteFolder={folderActions.delete} onSelectFolder={folderActions.select} onDropClip={clipActions.moveToFolder}/>
      <ClipList displayedClips={displayedClips} totalClips={clips.length} searchQuery={searchQuery} clipActions={clipActions} setSelectedClip={setSelectedClip} isSelectionMode={isSelectionMode} selectedIds={selectedIds}/>
      <DeleteButton  isVisible={isSelectionMode} count={selectedIds.length}  onDelete={clipActions.deleteSelected} />
      {selectedClip && (<ClipModal clip={selectedClip} onClose={() => setSelectedClip(null)} onCopy={clipActions.copy}/>)}
    </div>
  );
}

export default App;