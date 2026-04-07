import { useEffect, useCallback } from 'react';

export function useIPC(onMessageReceived) {
  useEffect(() => {
    const handleMessage = (msg) => {
      const rawData = typeof msg === 'string' ? msg : msg.data;
      try {
        const parsedData = JSON.parse(rawData);
        if (onMessageReceived) {
          onMessageReceived(parsedData);
        }
      } catch (e) {
        console.error("Error decoding the JSON from C#:", e);
      }
    };
    if (window.external && typeof window.external.receiveMessage === 'function') {
      window.external.receiveMessage(handleMessage);
    } else if (window.chrome && window.chrome.webview) {
      window.chrome.webview.addEventListener('message', handleMessage);
    }
    return () => {
      if (window.chrome && window.chrome.webview) {
        window.chrome.webview.removeEventListener('message', handleMessage);
      }
    };
  }, [onMessageReceived]);
  const sendCommand = useCallback((command, payload) => {
    const message = JSON.stringify({ command, payload });
    if (window.external && window.external.sendMessage) {
      window.external.sendMessage(message);
    } else {
      console.warn("IPC non disponibile. Inviato:", message);
    }
  }, []);
  return { sendCommand };
}