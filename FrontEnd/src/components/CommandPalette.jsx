import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette({ isOpen, onClose, searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 999}}/>
          <motion.div initial={{ opacity: 0, y: -50, scale: 0.95, x: '-50%' }} animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }} exit={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',  top: '8vh',  left: '50%', width: '90%', maxWidth: '600px', backgroundColor: 'rgba(30, 30, 30, 0.95)', 
              backdropFilter: 'blur(10px)', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid #3c3c3c', zIndex: 1000, overflow: 'hidden'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 15px' }}>
              <span style={{ fontSize: '20px', color: '#888', marginRight: '10px' }}>🔍</span>
              <input ref={inputRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cerca contenuti o app (es. chrome)..."
                style={{ width: '100%', padding: '20px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', outline: 'none'}}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}>
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}   