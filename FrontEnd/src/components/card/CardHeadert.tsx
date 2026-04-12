export function CardHeader ({ clip, onTogglePin, isSelectionMode }:any) {
  return(
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontSize: '11px', color: '#888' }}>
      🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleTimeString()}
    </div>
    {!isSelectionMode && (
          <button 
      onClick={() => onTogglePin(clip.Id)}
      className={clip.IsPinned ? "" : "reveal-on-hover"}
      style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: clip.IsPinned ? 1 : undefined}}
      title={clip.IsPinned ? "Rimuovi dalla cima" : "Fissa in cima"}> 📌
    </button>
    )}
  </div>
  );
}