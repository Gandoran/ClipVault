import { useState } from "react";

export function FolderCreator ({ onCreateFolder }:any){
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const handleCreate = () => {
    if (newFolderName.trim()) onCreateFolder(newFolderName);
    setNewFolderName("");
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <input 
        autoFocus value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCreate()} onBlur={handleCreate} 
        style={{ background: '#111', color: '#fff', border: '1px solid #007acc', borderRadius: '4px', padding: '4px 8px', fontSize: '12px' }} placeholder="Nome..." 
      />
    );
  }
  return (
    <button onClick={() => setIsCreating(true)} title="Crea una Nuova Cartella" style={{ background: '#333', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}>
      ➕
    </button>
  );
};
