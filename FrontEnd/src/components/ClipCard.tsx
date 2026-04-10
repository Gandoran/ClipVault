import { useState, useRef, useEffect } from 'react';
import { CardEditor } from './card/CardEditor';
import { CardActions } from './card/CardActions';
import { CardHeader } from './card/CardHeadert';

export function ClipCard({ clip, onCopy, onDelete, onTogglePin, onUpdateContent, onExpand }:any) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
    draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("clipId", clip.Id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: '#2d2d2d', padding: '15px', borderRadius: '8px', 
        borderLeft: clip.IsPinned ? '4px solid #fbc02d' : '4px solid transparent',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.2s ease-in-out', 
        display: 'flex', flexDirection: 'column', gap: '10px' 
      }}>
      <CardHeader clip={clip} isHovered={isHovered} onTogglePin={onTogglePin} />      
      <CardEditor clip={clip} onUpdateContent={onUpdateContent} />
      <CardActions clip={clip} isHovered={isHovered} onCopy={onCopy} onDelete={onDelete} onExpand={onExpand}/>
    </div>
  );
}