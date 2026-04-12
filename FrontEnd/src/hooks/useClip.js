import { useState, useCallback, useEffect } from 'react';

const sortClips = (clips) => {
  return [...clips].sort((a,b) => {
    if(a.IsPinned !== b.IsPinned) return a.IsPinned ?-1 :1
    return new Date(b.CreatedAt) - new Date(a.CreatedAt);
  });
}

export function useClips(sendCommand,selectedFolderId) {
  const [clips, setClips] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const processIncomingClip = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_CLIPS_LOADED') setClips(parsedData.data);
    else if (parsedData.type === 'NEW_CLIP') 
      if (selectedFolderId === null) setClips((prev) => {
        const newState=[parsedData.data, ...prev];
        return sortClips(newState);
    });
  }, [selectedFolderId]);
  useEffect(() => {
    sendCommand("GET_ALL_CLIPS", selectedFolderId);
  }, [selectedFolderId, sendCommand]);
  const clipActions = {
    copy: (content, type = "Text") => {
      sendCommand("COPY_CLIP", { content, type });
    },
    delete: (id) => {
      sendCommand("DELETE_CLIP", id);
      setClips((prev) => prev.filter(clip => clip.Id !== id));
    },
    togglePin: (id) => {
      sendCommand("TOGGLE_PIN",id);
      setClips(prev=>{
        const newState = prev.map(c=> c.Id ==id ? {...c, IsPinned: !c.IsPinned}:c);
        return sortClips(newState);
      })
    },
    updateContent: (id, newContent) => {
      setClips((prev) => prev.map(clip => clip.Id === id ? { ...clip, Content: newContent } : clip));
      sendCommand("UPDATE_CLIP_CONTENT", { id, content: newContent });
    },
    moveToFolder: (clipId, folderId) => {
      sendCommand("MOVE_CLIP", { clipId, folderId });
      setClips((prev) => prev.filter(clip => clip.Id !== clipId));
    },
    startSelection: () => {
      setIsSelectionMode(true);
    },
    stopSelection: () => {
      setIsSelectionMode(false);
      setSelectedIds([]);
    },
    toggleSelect: (id) => {
      setSelectedIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    },
    selectAll: () => {
      const allIds = clips.map(c => c.Id);
      setSelectedIds(selectedIds.length === clips.length ? [] : allIds);
    },
    deleteSelected: () => {
      if (selectedIds.length === 0) return;
      sendCommand("MULTIPLE_CLIPS_DELETE", selectedIds);
      setClips(prev => prev.filter(c => !selectedIds.includes(c.Id)));
      setIsSelectionMode(false);
      setSelectedIds([]);
    }
  };
  return { clips, isSelectionMode, selectedIds, processIncomingClip, clipActions };
}