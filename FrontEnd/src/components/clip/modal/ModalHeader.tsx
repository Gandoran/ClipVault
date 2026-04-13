import { toast } from "react-toastify";

export function ModalHeader ({ clip, onClose, onCopy }:any) {
 return(
  <div style={{ padding: '15px 20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '14px', color: '#888' }}>
      🖥️ {clip.SourceApp} • {new Date(clip.CreatedAt).toLocaleString()}
    </span>
    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => {onCopy(clip.Content,clip.Type); toast.success("Copiato negli appunti!")}} 
        style={{ background: '#007acc', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 15px', cursor: 'pointer' }}>
        📋 {clip.Type === 'Image' ? "Copia Immagine" : "Copia Tutto"}
      </button>
      <button onClick={onClose} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
        &times;
      </button>
    </div>
  </div>
 )
}