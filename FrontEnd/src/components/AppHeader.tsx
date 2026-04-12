export function AppHeader({ isSelectionMode, selectedCount, totalCount, onStartSelection, onStopSelection, onSelectAll, onOpenSearch}: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px', minHeight: '35px'}}>
      <h2 style={{ margin: 0 }}>📋 ClipVault</h2>
      {!isSelectionMode ? (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={onOpenSearch}  title="Cerca (Ctrl+F)"
            style={{  background: '#252526', color: '#aaa', border: '1px solid #333', borderRadius: '4px',  padding: '4px 10px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔍</span> <span style={{ opacity: 0.7 }}>Ctrl+F</span>
            </button>
          <button onClick={onStartSelection} style={{ background: 'transparent', color: '#ff5252', border: '1px solid #ff5252', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Elimina Clip</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={onSelectAll} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>
            {selectedCount === totalCount ? "Deseleziona Tutto" : "Seleziona Tutto"}
          </button>
          <button onClick={onStopSelection} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Annulla</button>
        </div>
      )}
    </div>
  );
}