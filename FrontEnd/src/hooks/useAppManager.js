import { useEffect } from 'react';
import { useIPC } from './useIPC';
import { useClips } from './useClip';
import { useFolders } from './useFolder';

export function useAppManager() {
  let routeToClips, routeToFolders;
  const { sendCommand } = useIPC((parsedData) => {
    if (routeToClips) routeToClips(parsedData);
    if (routeToFolders) routeToFolders(parsedData);
  });
  const { folders, selectedFolderId, processIncomingFolder, folderActions } = useFolders(sendCommand);
  const { clips, isSelectionMode, selectedIds, processIncomingClip, clipActions } = useClips(sendCommand,selectedFolderId);
  routeToClips = processIncomingClip;
  routeToFolders = processIncomingFolder;
  useEffect(() => {
    sendCommand("GET_ALL_FOLDERS", null);
  }, [sendCommand]);
  return {
    state: { clips, folders, selectedFolderId, isSelectionMode, selectedIds },
    clipActions,
    folderActions
  };
}