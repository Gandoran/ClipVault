export function ModalBody({ clip }:any) {
  return(
  <div style={{ padding: '20px', overflowY: 'auto', flex: 1, textAlign: clip.Type === 'Image' ? 'center' : 'left' }}>
    {clip.Type === 'Image' ? (
      <img src={clip.Content} alt="Zoom" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} />
    ) : (
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "Consolas, Monaco, monospace", fontSize: '13px', color: '#d4d4d4', lineHeight: '1.5' }}>
        {clip.Content}
      </pre>
    )}
  </div>
  )
}