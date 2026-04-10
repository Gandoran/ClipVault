import { useState, useCallback } from 'react';

export function useFolders(sendCommand) {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const processIncomingFolder = useCallback((parsedData) => {
    if (parsedData.type === 'ALL_FOLDERS_LOADED') setFolders(parsedData.data);
  }, []);
  const folderActions = {
    create: (name) => sendCommand("CREATE_FOLDER", name),
    delete: (id) => {
      sendCommand("DELETE_FOLDER", id);
      if (selectedFolderId === id) setSelectedFolderId(null);
    },
    select: setSelectedFolderId
  };
  return { folders, selectedFolderId, processIncomingFolder, folderActions };
}