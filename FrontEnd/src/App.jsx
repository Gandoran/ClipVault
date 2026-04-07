import { useState, useEffect, useCallback } from 'react';
import { useIPC } from './hooks/useIpc';

function App() {
  const [clips, setClips] = useState([]);

  // Gestione dei messaggi in arrivo da C#
  const handleIncomingMessage = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_CLIPS_LOADED') {
      // Caricamento iniziale
      setClips(parsedData.data);
    } 
    else if (parsedData.type === 'NEW_CLIP') {
      // Quando copiamo qualcosa di nuovo, lo mettiamo in cima alla lista!
      setClips((prevClips) => [parsedData.data, ...prevClips]);
    }
  }, []);

  const { sendCommand } = useIPC(handleIncomingMessage);

  // Appena React si avvia, chiede il database a C#
  useEffect(() => {
    sendCommand("GET_ALL_CLIPS", null);
  }, [sendCommand]);

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📋 ClipVault
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {clips.map((clip) => (
          <div 
            key={clip.Id.Increment} // LiteDB usa oggetti complessi per l'ID, usiamo l'incremento
            style={{ 
              backgroundColor: '#2d2d2d', 
              padding: '15px', 
              borderRadius: '8px', 
              borderLeft: '4px solid #007acc' 
            }}
          >
            {/* Intestazione del Clip (App di Origine e Data) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
              <span>🖥️ {clip.SourceApp}</span>
              <span>{new Date(clip.CreatedAt).toLocaleTimeString()}</span>
            </div>
            
            {/* Testo del Clip (tagliato se troppo lungo) */}
            <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {clip.Content.length > 150 ? clip.Content.substring(0, 150) + '...' : clip.Content}
            </div>
          </div>
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