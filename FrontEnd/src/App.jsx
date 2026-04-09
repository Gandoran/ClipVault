import { useState } from 'react';
import { useClipManager } from './hooks/useClipManager';
import { ClipCard } from './components/ClipCard';
import { ClipModal } from './components/ClipModal';
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { clips, handleCopy, handleDelete, handleTogglePin, handleUpdateContent} = useClipManager();
  const [selectedClip, setSelectedClip] = useState(null);

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <ToastContainer theme="dark" position="bottom-right" autoClose={300} hideProgressBar={true} />
      <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📋 ClipVault
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence>
          {clips.map((clip) => (
            <motion.div key={clip.Id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.1 }}>
              <ClipCard key={clip.Id} clip={clip} onCopy={handleCopy} onDelete={handleDelete} onTogglePin={handleTogglePin} onUpdateContent={handleUpdateContent} onExpand={(clip) => setSelectedClip(clip)}/>
            </motion.div>
          ))}
        </AnimatePresence>
        {clips.length === 0 && (
          <p style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
            Nessun clip trovato. Inizia a copiare!
          </p>
        )}
      </div>
      {selectedClip && (
        <ClipModal clip={selectedClip} onClose={() => setSelectedClip(null)} onCopy={handleCopy}/>
      )}
    </div>
  );
}

export default App;