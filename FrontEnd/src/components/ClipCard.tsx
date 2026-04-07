export function ClipCard({ clip, onCopy, onDelete }: any) {
  return (
    <div 
      style={{ backgroundColor: '#2d2d2d', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #007acc',
        display: 'flex',flexDirection: 'column',gap: '10px'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa' }}>
        <span>🖥️ {clip.SourceApp}</span>
        <span>{new Date(clip.CreatedAt).toLocaleTimeString()}</span>
      </div>
      <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#e0e0e0' }}>
        {clip.Content.length > 200 ? clip.Content.substring(0, 200) + '...' : clip.Content}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '5px' }}>
        <button 
          onClick={() => onCopy(clip.Content)}
          style={{ padding: '5px 12px', background: '#007acc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
          📋 Copia
        </button>
        <button 
          onClick={() => onDelete(clip.Id)}
          style={{ padding: '5px 12px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
          🗑️ Elimina
        </button>
      </div>
    </div>
  );
}