import { useClipManager } from './hooks/useClipManager';
import { ClipCard } from './components/ClipCard';

function App() {
  const { clips, handleCopy, handleDelete, handleTogglePin, handleUpdateContent} = useClipManager();

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📋 ClipVault
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {clips.map((clip) => (
          <ClipCard key={clip.Id} clip={clip} onCopy={handleCopy} onDelete={handleDelete} onTogglePin={handleTogglePin} onUpdateContent={handleUpdateContent}/>
        ))}
        {clips.length === 0 && (
          <p style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
            Nessun clip trovato. Inizia a copiare!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;