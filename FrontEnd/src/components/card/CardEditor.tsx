import { useEffect, useRef, useState } from "react";
import { ClipContentRenderer } from "../ClipContentRenderer";

export function CardEditor ({ clip, onUpdateContent }:any) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(clip.Content);
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (isEditing) (textAreaRef.current as unknown as HTMLElement)?.focus();
  }, [isEditing]);
  const handleSave = () => {
    if (tempText.trim() !== clip.Content) onUpdateContent(clip.Id, tempText);
    setIsEditing(false);
  };
  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === 'Escape') { setTempText(clip.Content); setIsEditing(false); }
  };
  if (clip.Type === 'Image') {
    return (
      <div style={{ maxHeight: '120px', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#111', display: 'flex', justifyContent: 'center' }}>
        <img src={clip.Content} alt="Cattura" style={{ width: '100%', objectFit: 'cover', opacity: 0.9 }} />
      </div>
    );
  }
  return (
    <div onDoubleClick={() => setIsEditing(true)}>
      {isEditing ? (
        <textarea ref={textAreaRef} value={tempText} onChange={(e) => setTempText(e.target.value)} onBlur={handleSave} onKeyDown={handleKeyDown}
          style={{ 
            width: '100%', backgroundColor: '#1e1e1e', color: '#fff', 
            border: '1px solid #007acc', borderRadius: '4px', padding: '5px',
            fontFamily: 'inherit', fontSize: '14px', minHeight: '60px', resize: 'vertical'
          }}/>
      ) : (
        <div style={{ padding: '5px 0'}}>
          <ClipContentRenderer clip={clip} isModal={false}/>
        </div>
      )}
    </div>
  );
};