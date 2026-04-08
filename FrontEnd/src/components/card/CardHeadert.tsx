export function CardHeader ({ clip, isHovered, onTogglePin }:any) {
  return(
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontSize: '11px', color: '#888' }}>
      🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleTimeString()}
    </div>
    <button 
      onClick={() => onTogglePin(clip.Id)} 
      style={{ 
        background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', 
        opacity: clip.IsPinned ? 1 : (isHovered ? 0.4 : 0), 
        transition: 'opacity 0.2s ease-in-out'
      }}
      title={clip.IsPinned ? "Rimuovi dalla cima" : "Fissa in cima"}> 📌
    </button>
  </div>
  );
}