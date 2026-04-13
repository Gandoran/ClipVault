import { ClipContentRenderer } from "../ClipContentRenderer";

export function ModalBody({ clip }:any) {
  return(
  <div style={{ padding: '20px', overflowY: 'auto', flex: 1, textAlign: clip.Type === 'Image' ? 'center' : 'left' }}>
    {clip.Type === 'Image' ? (
      <img src={clip.Content} alt="Zoom" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} />
    ) : (
      <pre style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ClipContentRenderer clip={clip} isModal={true} />
    </pre>
    )}
  </div>
  )
}