export function AppHeader({ isSelectionMode, selectedCount, totalCount, onStartSelection, onStopSelection, onSelectAll}: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px', minHeight: '35px'}}>
      <h2 style={{ margin: 0 }}>📋 ClipVault</h2>
      {!isSelectionMode ? (
        <button onClick={onStartSelection} style={{ background: 'transparent', color: '#ff5252', border: '1px solid #ff5252', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Elimina Clip</button>
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