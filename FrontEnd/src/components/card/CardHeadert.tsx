export function CardHeader ({ clip, onTogglePin, isSelectionMode }:any) {
  return(
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontSize: '11px', color: '#888' }}>
      🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleTimeString()}
    </div>
    {clip.Tags && clip.Tags.length > 0 && (
          <span style={{backgroundColor: '#2a2a2a', color: '#007acc', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid #3c3c3c'}}>
            {clip.Tags[0]}
          </span>
        )}
    {!isSelectionMode && (
      <button 
        onClick={() => onTogglePin(clip.Id)}
        className={clip.IsPinned ? "" : "faded-pin"}
        style={{ background: 'transparent',  border: 'none', cursor: 'pointer', fontSize: '14px' }}
        title={clip.IsPinned ? "Rimuovi dalla cima" : "Fissa in cima"}> 📌
      </button>
    )}
  </div>
  );
}