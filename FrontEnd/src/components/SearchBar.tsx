export function SearchBar({ searchQuery, setSearchQuery }:any) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <input type="text" placeholder="🔍 Cerca nei contenuti o nell'app sorgente..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '70%', padding: '10px 15px', borderRadius: '8px',  border: '1px solid #3c3c3c', background: '#111', color: '#fff', fontSize: '14px', outline: 'none', transition: 'border 0.2s'}}
        onFocus={(e) => e.target.style.border = '1px solid #007acc'}
        onBlur={(e) => e.target.style.border = '1px solid #3c3c3c'}
      />
    </div>
  );
}