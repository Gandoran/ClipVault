import { useEffect, useCallback } from 'react';

export function useIPC(onMessageReceived) {
  useEffect(() => {
    window.handleIpcMessage = (msg) => {
      const rawData = typeof msg === 'string' ? msg : msg.data;
      try {
        const parsedData = JSON.parse(rawData);
        if (onMessageReceived) {
          onMessageReceived(parsedData);
        }
      } catch (e) {
        console.error("Errore nel decodificare il JSON da C#:", e);
      }
    };
    if (!window.ipcListenerRegistered) {
      if (window.external && typeof window.external.receiveMessage === 'function') {
        window.external.receiveMessage((msg) => {
          if (typeof window.handleIpcMessage === 'function') {
            window.handleIpcMessage(msg);
          }
        });
      }
      window.ipcListenerRegistered = true;
    }

  }, [onMessageReceived]);

  const sendCommand = useCallback((command, payload) => {
    const message = JSON.stringify({ command, payload });
    if (window.external && window.external.sendMessage) {
      window.external.sendMessage(message);
    }
  }, []);

  return { sendCommand };
}