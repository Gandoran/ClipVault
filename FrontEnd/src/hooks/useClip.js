import { useState, useCallback } from 'react';

export function useClips(sendCommand) {
  const [clips, setClips] = useState([]);
  const processIncomingClip = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_CLIPS_LOADED') setClips(parsedData.data);
    else if (parsedData.type === 'NEW_CLIP') setClips((prev) => [parsedData.data, ...prev]);
  }, []);
  const clipActions = {
    copy: (content, type = "Text") => sendCommand("COPY_CLIP", { content, type }),
    delete: (id) => {
      sendCommand("DELETE_CLIP", id);
      setClips((prev) => prev.filter(clip => clip.Id !== id));
    },
    togglePin: (id) => sendCommand("TOGGLE_PIN", id),
    updateContent: (id, newContent) => {
      setClips((prev) => prev.map(clip => clip.Id === id ? { ...clip, Content: newContent } : clip));
      sendCommand("UPDATE_CLIP_CONTENT", { id, content: newContent });
    },
    moveToFolder: (clipId, folderId) => sendCommand("MOVE_CLIP", { clipId, folderId })
  };
  return { clips, processIncomingClip, clipActions };
}