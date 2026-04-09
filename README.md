# ClipVault

## 📖 Descrizione Dettagliata

ClipVault è un software di gestione di clipboard personalizzata progettato per aiutare gli utenti a salvare, recuperare e organizzare le loro selezioni di testo. Il software monitora il clipboard dell'utente in tempo reale, consentendo agli utenti di salvare i contenuti copiati in un database locale e di accedervi da qualsiasi dispositivo.

ClipVault è particolarmente utile per professionisti che lavorano con informazioni importanti o sensibili, fornendo una soluzione semplice ma efficace per la conservazione temporanea delle selezioni di testo. Il software offre funzionalità avanzate come l'archiviazione dei contenuti in formato richiesto, l'abilità di aggiungere etichette e categorie ai clip copiati, e la possibilità di controllare se un determinato clip è stato salvato o meno.

## 🚀 Funzionalità Principali

1. **Monitoraggio del Clipboard**: ClipVault monitora in tempo reale le selezioni di testo dall'clipboard dell'utente.
2. **Archiviazione dei Clip**: I contenuti copiati vengono salvati in un database locale, offrendo la possibilità di accedervi da qualsiasi dispositivo.
3. **Visualizzazione e Gestione dei Clip**: Gli utenti possono visualizzare tutti i clip salvati, modificare il loro contenuto o eliminarli quando non sono più necessari.
4. **Pinning dei Clip**: Gli utenti possono "pin" determinati clip per accedervi in modo rapido e senza dover cercarli nel database.
5. **Categorie e Etichette**: I clip possono essere organizzati in categorie e etichettati per facilitare la ricerca.
6. **Sincronizzazione tra Dispositivi (TODO)**: ClipVault è progettato per supportare la sincronizzazione dei dati tra diversi dispositivi, consentendo agli utenti di accedere ai loro clip da qualsiasi dispositivo con connessione Internet.

## 🛠️ Architettura e Tecnologie

ClipVault è diviso in due moduli principali: un backend (.NET) e un frontend (React). Entrambi i moduli comunicano attraverso una API IPC (Inter-Process Communication).

### Backend (.NET)

Il backend di ClipVault è scritto in C# utilizzando .NET 10.0 Windows Forms. Utilizza la libreria LiteDB per gestire il database locale e Photino.NET per creare un'applicazione desktop.

Le principali classi del backend includono:

- **ClipItem**: rappresenta un singolo clip copiato.
- **ClipboardMonitorService**: monitora in tempo reale le selezioni di testo e salva i clip nel database.
- **ClipController**: fornisce metodi per gestire i clip, come la copia, l'eliminazione, il salvataggio e la modifica del contenuto.
- **ClipRepository**: gestisce l'accesso al database LiteDB, offrendo funzionalità per inserire, recuperare, modificare e eliminare i clip.
- **IOsClipboardService**: definisce un'interfaccia per le operazioni di clipboard.
- **LiteDbContext**: gestisce la connessione al database LiteDB.
- **MessageRouter**: gestisce il routing dei messaggi tra il backend e il frontend.

### Frontend (React)

Il frontend di ClipVault è implementato in React, utilizzando Vite come ambiente di sviluppo. Utilizza Framer Motion per le animazioni e React Toastify per i notifiche.

Le principali componenti del frontend includono:

- **App.jsx**: componente principale dell'applicazione, che gestisce lo stato dei clip e renderizza la lista dei clip.
- **ClipCard.tsx**: componente che rappresenta un singolo clip nel feed.
- **ClipModal.tsx**: componente che consente agli utenti di visualizzare e modificare il contenuto di un clip.
- **hooks/useClipManager.js**: hook personalizzato per gestire lo stato dei clip.
- **hooks/useIpc.js**: hook personalizzato per la comunicazione tra il frontend e il backend.

## 🧩 Moduli e Componenti Core

### Backend (.NET)

1. **ClipItem**: Questa classe rappresenta un singolo clip copiato, con proprietà come `Id`, `Content`, `Type`, `SourceApp`, `IsPinned` e `Tags`.

2. **ClipboardMonitorService**: Questa classe si occupa del monitoraggio delle selezioni di testo dall'clipboard dell'utente. Inizia a monitorare gli eventi del clipboard quando viene avviato il servizio, e aggiunge i nuovi clip al database utilizzando la classe `ClipRepository`.

3. **ClipController**: Questa classe fornisce metodi per gestire i clip, come la copia, l'eliminazione, il salvataggio e la modifica del contenuto. Utilizza la classe `ClipRepository` per accedere al database e la classe `ClipboardMonitorService` per monitorare gli eventi del clipboard.

4. **ClipRepository**: Questa classe gestisce l'accesso al database LiteDB, offrendo funzionalità per inserire, recuperare, modificare e eliminare i clip.

5. **IOsClipboardService**: Questa interfaccia definisce un'interfaccia per le operazioni di clipboard, utilizzata dalle classi specifiche del sistema operativo (es. `WindowsClipboardService`).

6. **LiteDbContext**: Questa classe gestisce la connessione al database LiteDB.

7. **MessageRouter**: Questa classe gestisce il routing dei messaggi tra il backend e il frontend, utilizzando Photino.NET per comunicare attraverso una API IPC.

### Frontend (React)

1. **ClipCard.tsx**: Questo componente rappresenta un singolo clip nel feed. Mostra il contenuto del clip e fornisce pulsanti per la copia, l'eliminazione e la modifica del contenuto.

2. **ClipModal.tsx**: Questo componente consente agli utenti di visualizzare e modificare il contenuto di un clip. Utilizza i componenti `CardHeader`, `CardEditor` e `CardActions`.

3. **hooks/useClipManager.js**: Questo hook personalizzato gestisce lo stato dei clip, recuperando i dati dal backend attraverso la comunicazione IPC.

4. **hooks/useIpc.js**: Questo hook personalizzato gestisce la comunicazione tra il frontend e il backend, utilizzando la libreria React IpcRenderer per ricevere messaggi dal backend.

## 💻 Installazione e Avvio

### Backend (.NET)

1. Apri una finestra del terminale.
2. Naviga alla directory del progetto backend (`BackEnd`).
3. Esegui il comando di installazione delle dipendenze:
   ```sh
   dotnet restore
   ```
4. Esegui il progetto:
   ```sh
   dotnet run
   ```

### Frontend (React)

1. Apri una finestra del terminale.
2. Naviga alla directory del progetto frontend (`FrontEnd`).
3. Installa le dipendenze npm:
   ```sh
   npm install
   ```
4. Avvia l'applicazione di sviluppo:
   ```sh
   npm run dev
   ```

### Nota

ClipVault è ancora in fase di sviluppo e alcune funzionalità, come la sincronizzazione tra dispositivi, sono attualmente in corso di implementazione.

## Project Structure:
```text
ClipVault/
├── BackEnd
│   ├── Models
│   │   └── ClipItem.cs
│   ├── Services
│   │   ├── ClipBoardMonitorService.cs
│   │   ├── ClipController.cs
│   │   ├── ClipRepository.cs
│   │   ├── IOsClipboardService.cs
│   │   ├── LiteDbContext.cs
│   │   ├── MessageRouter.cs
│   │   ├── WindowTracker.cs
│   │   └── WindowsClipboardService.cs
│   ├── data
│   ├── Backend.csproj
│   └── Program.cs
├── FrontEnd
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── card
│   │   │   │   ├── CardActions.tsx
│   │   │   │   ├── CardEditor.tsx
│   │   │   │   └── CardHeadert.tsx
│   │   │   ├── modal
│   │   │   │   ├── ModalBody.tsx
│   │   │   │   └── ModalHeader.tsx
│   │   │   ├── ClipCard.tsx
│   │   │   └── ClipModal.tsx
│   │   ├── hooks
│   │   │   ├── useClipManager.js
│   │   │   └── useIpc.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── ClipVault.sln
```
