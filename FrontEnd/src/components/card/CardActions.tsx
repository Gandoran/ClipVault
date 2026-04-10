import { toast } from "react-toastify";

export function CardActions ({ clip, isHovered, onCopy, onDelete, onExpand }:any) {
  return (
  <div className="reveal-on-hover" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '5px' }}>
    <button onClick={() => onExpand(clip)} style={{ background: 'transparent', color: '#4caf50', border: 'none', cursor: 'pointer', fontSize: '13px', padding: 0 }}>🔍 Espandi</button>
    <button onClick={() => {onCopy(clip.Content, clip.Type),toast.success("Copiato negli appunti!")}} style={{ background: 'transparent', color: '#007acc', border: 'none', cursor: 'pointer', fontSize: '13px', padding: 0 }}>📋 Copia</button>
    <button onClick={() => onDelete(clip.Id)} style={{ background: 'transparent', color: '#d32f2f', border: 'none', cursor: 'pointer', fontSize: '13px', padding: 0 }}>🗑️ Elimina</button>
  </div>
  );
}