import { useState, useEffect, useCallback } from 'react';
import { useIPC } from './hooks/useIPC';
import { ClipCard } from './components/ClipCard';
import {ToastContainer, toast} from 'react-toastify'

function App() {
  const [clips, setClips] = useState([]);

  const handleIncomingMessage = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_CLIPS_LOADED') {
      setClips(parsedData.data);
    } 
    else if (parsedData.type === 'NEW_CLIP') {
      setClips((prevClips) => [parsedData.data, ...prevClips]);
    }
  }, []);
  const { sendCommand } = useIPC(handleIncomingMessage)
  useEffect(() => {
    sendCommand("GET_ALL_CLIPS", null);
  }, [sendCommand]);

  const handleDelete = (id) => {
    sendCommand("DELETE_CLIP", id);
    //instant front-end remove
    setClips((prevClips) => prevClips.filter(clip => clip.Id !== id));
  };

  const handleCopy = (content) => {
    sendCommand("COPY_CLIP", content);
    //TODO aggiungere toastify content 
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📋 ClipVault
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {clips.map((clip) => (
          <ClipCard key={clip.Id} clip={clip} onCopy={handleCopy} onDelete={handleDelete}/>
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