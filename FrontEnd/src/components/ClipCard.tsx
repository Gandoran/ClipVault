import { useState, useRef, useEffect } from 'react';

export function ClipCard({ clip, onCopy, onDelete, onTogglePin, onUpdateContent }:any) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(clip.Content);
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (isEditing) (textAreaRef.current as unknown as HTMLElement)?.focus();
  }, [isEditing]);

  const handleSave = () => {
    if (tempText.trim() !== clip.Content) {
      onUpdateContent(clip.Id, tempText);
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setTempText(clip.Content);
      setIsEditing(false);
    }
  };
  return (
    <div style={{backgroundColor: '#2d2d2d', padding: '15px', borderRadius: '8px',borderLeft: clip.IsPinned ? '4px solid #fbc02d' : '4px solid #007acc',display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '11px', color: '#888' }}>
          🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleTimeString()}
        </div>
        <button onClick={() => onTogglePin(clip.Id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: clip.IsPinned ? 1 : 0.3 }}>📌</button>
      </div>
      <div onDoubleClick={() => setIsEditing(true)}>
        {isEditing ? (
          <textarea ref={textAreaRef} value={tempText} onChange={(e) => setTempText(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown}
            style={{ 
              width: '100%', backgroundColor: '#1e1e1e', color: '#fff', 
              border: '1px solid #007acc', borderRadius: '4px', padding: '5px',
              fontFamily: 'inherit', fontSize: '14px', minHeight: '60px', resize: 'vertical'
            }}
          />
        ) : (
          <div style={{fontSize: '14px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#e0e0e0', cursor: 'text' }}>
            {clip.Content.length > 300 ? clip.Content.substring(0, 300) + '...' : clip.Content}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button onClick={() => onCopy(clip.Content)} style={{ background: '#007acc', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px' }}>Copia</button>
        <button onClick={() => onDelete(clip.Id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '11px' }}>Elimina</button>
      </div>
    </div>
  );
}