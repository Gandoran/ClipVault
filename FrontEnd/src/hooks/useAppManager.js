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
  const { clips, processIncomingClip, clipActions } = useClips(sendCommand);
  const { folders, selectedFolderId, processIncomingFolder, folderActions } = useFolders(sendCommand);
  routeToClips = processIncomingClip;
  routeToFolders = processIncomingFolder;
  useEffect(() => {
    sendCommand("GET_ALL_CLIPS", null);
    sendCommand("GET_ALL_FOLDERS", null);
  }, [sendCommand]);
  return {
    state: { clips, folders, selectedFolderId },
    clipActions,
    folderActions
  };
}