export function CardHeader({ clip, onTogglePin, isSelectionMode }: any) {
  const tagColors: Record<string, string> = {
    code: '#58a6ff',
    password: '#ff6b6b', 
    link: '#4caf50',
    email: '#a371f7',
    image: '#ff9800', 
    text: '#888888'
  };
  const primaryTag = clip.Tags && clip.Tags.length > 0 ? clip.Tags[0].toLowerCase() : null;
  const tagColor = primaryTag && tagColors[primaryTag] ? tagColors[primaryTag] : tagColors.text;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '11px', color: '#888' }}>
          🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleTimeString()}
        </div>
        {primaryTag && (
          <span style={{ backgroundColor: `${tagColor}20`, color: tagColor, padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', border: `1px solid ${tagColor}50`}}>
            {primaryTag}
          </span>
        )}
      </div>
      <button onClick={() => onTogglePin(clip.Id)} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = clip.IsPinned ? '1' : '0.3'} title={clip.IsPinned ? "Rimuovi dalla cima" : "Fissa in cima"}
        style={{ background: 'transparent',  border: 'none',  cursor: 'pointer', fontSize: '14px', visibility: isSelectionMode ? 'hidden' : 'visible', opacity: clip.IsPinned ? 1 : 0.1, transition: 'opacity 0.2s ease' }} >
          📌
      </button>
    </div>
  );
}