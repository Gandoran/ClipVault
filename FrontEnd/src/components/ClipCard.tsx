import { useState, useRef, useEffect } from 'react';
import { CardEditor } from './card/CardEditor';
import { CardActions } from './card/CardActions';
import { CardHeader } from './card/CardHeadert';

export function ClipCard({ clip, onCopy, onDelete, onTogglePin, onUpdateContent, onExpand, isSelectionMode, isSelected, onToggleSelect }:any) {
  return (
    <div 
      className="clip-card"
      draggable={!isSelectionMode}
      onDragStart={(e) => {
        e.dataTransfer.setData("clipId", clip.Id);
        e.dataTransfer.effectAllowed = "move";
        const dragGhost = e.currentTarget.cloneNode(true) as HTMLElement;
        dragGhost.style.transform = 'scale(0.5)';
        dragGhost.style.position = 'absolute'; dragGhost.style.top = '-1000px';
        document.body.appendChild(dragGhost);
        e.dataTransfer.setDragImage(dragGhost, 0, 0);
        setTimeout(() => document.body.removeChild(dragGhost), 0);
      }}
      onClick={() => isSelectionMode && onToggleSelect(clip.Id)} 
      style={{  position: 'relative', backgroundColor: isSelected ? '#3a3a3a' : '#2d2d2d', padding: '15px', borderRadius: '8px', 
        borderLeft: clip.IsPinned && !isSelectionMode ? '4px solid #fbc02d' : '4px solid transparent', border: isSelected ? '1px solid #007acc' : '1px solid transparent',
        transition: 'all 0.2s ease-in-out',  display: 'flex', flexDirection: 'column', gap: '10px', cursor: isSelectionMode ? 'pointer' : 'default'
      }}>
      {isSelectionMode && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 10, width: '20px', height: '20px', borderRadius: '4px',border: '2px solid #007acc',
          backgroundColor: isSelected ? '#007acc' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold'
        }}>
          {isSelected && "✓"}
        </div>
      )}
      <div style={{ opacity: isSelectionMode ? 0.5 : 1,  pointerEvents: isSelectionMode ? 'none' : 'auto', display: 'flex', flexDirection: 'column', gap: '10px' 
      }}>
        <CardHeader clip={clip} onTogglePin={onTogglePin} isSelectionMode={isSelectionMode}/>
        <CardEditor clip={clip} onUpdateContent={onUpdateContent} />
        <CardActions clip={clip} onCopy={onCopy} onDelete={onDelete} onExpand={onExpand} isSelectionMode={isSelectionMode}/>
      </div>
    </div>
  );
}