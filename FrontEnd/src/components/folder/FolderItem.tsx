import { useState } from "react";

export function FolderItem ({ folder, isSelected, onSelect, onDropClip, onDelete }:any){
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={() => onSelect(isSelected ? null : folder.Id)}
      onDragOver={(e) => e.preventDefault()} 
      onDrop={(e) => {
        e.preventDefault();
        const clipId = e.dataTransfer.getData("clipId");
        if (clipId) onDropClip(clipId, folder.Id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative', background: isSelected ? '#007acc' : '#252526', color: '#fff', border: isSelected ? '1px solid #007acc' : '1px solid #3c3c3c', 
        borderRadius: '4px', padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'pointer',transition: 'all 0.2s'
      }}
    >📁 {folder.Name}
      {(isHovered || isSelected) && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(folder.Id); }}
          style={{
            position: 'absolute', top: '-6px', right: '-6px', background: '#1e1e1e', color: '#ff5252', border: '1px solid #3c3c3c', borderRadius: '50%',
            width: '16px', height: '16px', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', padding: 0
          }}
          title="Elimina Cartella"> ✕
        </button>
      )}
    </div>
  );
};