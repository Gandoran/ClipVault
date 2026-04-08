import { useEffect } from 'react';
import { ModalHeader } from './modal/ModalHeader';
import { ModalBody } from './modal/ModalBody';

export function ClipModal({ clip, onClose, onCopy }:any) {
  useEffect(() => {
    const handleKeyDown = (e:any) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  if (!clip) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',zIndex: 1000, padding: '20px'}}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#1e1e1e', borderRadius: '12px',width: '100%', maxWidth: '800px', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column', border: '1px solid #333'
        }}>
        <ModalHeader clip={clip} onClose={onClose} onCopy={onCopy} />
        <ModalBody content={clip.Content} />
      </div>
    </div>
  );
}