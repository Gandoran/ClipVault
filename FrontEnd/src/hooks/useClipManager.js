import { useState, useEffect, useCallback } from 'react';
import { useIPC } from './useIPC';

export function useClipManager() {
const [clips, setClips] = useState([]);
  const handleIncomingMessage = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_CLIPS_LOADED') setClips(parsedData.data);
    else if (parsedData.type === 'NEW_CLIP') setClips((prevClips) => [parsedData.data, ...prevClips]);
  }, []);

  const { sendCommand } = useIPC(handleIncomingMessage);

  useEffect(() => {
    sendCommand("GET_ALL_CLIPS", null);
  }, [sendCommand]);

  const handleDelete = (id) => {
    sendCommand("DELETE_CLIP", id);
    setClips((prevClips) => prevClips.filter(clip => clip.Id !== id));
  };

  const handleCopy = (content,type="Text") => {
    console.log("Copia in corso, tipo riconosciuto:", type);
    sendCommand("COPY_CLIP", {content,type});
  };

  const handleTogglePin = (id) => {
    sendCommand("TOGGLE_PIN", id);
  };

  const handleUpdateContent = (id, newContent) => {
    setClips((prevClips) => 
       prevClips.map(clip => clip.Id === id ? { ...clip, Content: newContent } : clip)
    );
    sendCommand("UPDATE_CLIP_CONTENT", { id, content: newContent });
  }

  return {
    clips,
    handleCopy,
    handleDelete,
    handleTogglePin,
    handleUpdateContent,
  };
}