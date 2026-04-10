import { useState } from 'react';
import { useAppManager } from './hooks/useAppManager';
import { ClipCard } from './components/ClipCard';
import { ClipModal } from './components/ClipModal';
import { FolderBar } from './components/FolderBar';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { state, clipActions, folderActions } = useAppManager();
  const [selectedClip, setSelectedClip] = useState(null);
  const filteredClips = state.clips.filter(clip => clip.FolderId === state.selectedFolderId);


  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <ToastContainer theme="dark" position="bottom-right" autoClose={300} hideProgressBar={true} />
      <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📋 ClipVault
      </h2>
      <FolderBar folders={state.folders} selectedFolderId={state.selectedFolderId} onCreateFolder={folderActions.create} onDeleteFolder={folderActions.delete} onSelectFolder={folderActions.select} onDropClip={clipActions.moveToFolder}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence mode="popLayout">
          {state.clips.map((clip) => (
            <motion.div key={clip.Id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}>
              <ClipCard clip={clip} onCopy={clipActions.copy} onDelete={clipActions.delete} onTogglePin={clipActions.togglePin} onUpdateContent={clipActions.updateContent} onExpand={(clip) => setSelectedClip(clip)}/>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredClips.length === 0 && (
          <p style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
            Nessun clip trovato. Inizia a copiare!
          </p>
        )}
      </div>
      {selectedClip && (
        <ClipModal clip={selectedClip} onClose={() => setSelectedClip(null)} onCopy={clipActions.copy}/>
      )}
    </div>
  );
}

export default App;