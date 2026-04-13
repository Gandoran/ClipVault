import { motion, AnimatePresence } from 'framer-motion';
import { ClipCard } from './ClipCard';

export function ClipList({ displayedClips, totalClips, clipActions, setSelectedClip, isSelectionMode, selectedIds }:any) {
  if (totalClips === 0) {
    return (
      <p style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>Nessun clip in questa cartella. Inizia a copiare!</p>
    );
  }
  if (displayedClips.length === 0) {
    return (
      <p style={{ color: '#888', textAlign: 'center', marginTop: '30px' }}> Nessuna clip trovata</p>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <AnimatePresence mode="popLayout">
        {displayedClips.map((clip:any) => (
          <motion.div key={clip.Id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}>
            <ClipCard clip={clip} onCopy={clipActions.copy} onDelete={clipActions.delete} onTogglePin={clipActions.togglePin} onUpdateContent={clipActions.updateContent} onExpand={() => setSelectedClip(clip)} isSelectionMode={isSelectionMode}  isSelected={selectedIds.includes(clip.Id)}  onToggleSelect={clipActions.toggleSelect}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}