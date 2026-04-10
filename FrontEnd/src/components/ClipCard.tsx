import { useState, useRef, useEffect } from 'react';
import { CardEditor } from './card/CardEditor';
import { CardActions } from './card/CardActions';
import { CardHeader } from './card/CardHeadert';

export function ClipCard({ clip, onCopy, onDelete, onTogglePin, onUpdateContent, onExpand }:any) {
  return (
    <div 
      className="clip-card"
      draggable="true"
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
      style={{ 
        backgroundColor: '#2d2d2d', padding: '15px', borderRadius: '8px', 
        borderLeft: clip.IsPinned ? '4px solid #fbc02d' : '4px solid transparent',
        transition: 'all 0.2s ease-in-out', display: 'flex', flexDirection: 'column', gap: '10px' 
      }}>
      <CardHeader clip={clip} onTogglePin={onTogglePin} />
      <CardEditor clip={clip} onUpdateContent={onUpdateContent} />
      <CardActions clip={clip} onCopy={onCopy} onDelete={onDelete} onExpand={onExpand} />
    </div>
  );
}