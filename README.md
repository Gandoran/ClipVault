# ClipVault

## 📖 Descrizione Dettagliata
ClipVault è un software di gestione di appunti e tagli, progettato per facilitare la memorizzazione e l'accesso rapido a informazioni importanti. Il sistema integra funzionalità come il monitoraggio della clipboard, l'identificazione automatica di contenuti specifici (come email, link, codici sorgente), e una struttura organizzativa delle appunti in cartelle.

## 🚀 Funzionalità Principali
ClipVault offre le seguenti funzionalità principali:

- **Monitoraggio della clipboard**: ClipVault monitora costantemente la clipboard e registra automaticamente i contenuti. Questo include testi, immagini e dati binari.
  
- **Identificazione automatizzata di contenuti**: I contenuti vengono analizzati per rilevare tipi specifici (come email, link web, codici sorgente). Ogni tipo viene etichettato automaticamente.

- **Gestione appunti in cartelle**: Gli appunti possono essere organizzati in diverse cartelle. Ciò facilita la ricerca e l'accesso ai contenuti.

- **Funzionalità di ricerca**: Permette di cercare appunti tramite testo o etichette.

- **Selezione multipla e azioni**: È possibile selezionare più appunti contemporaneamente per operazioni come copia, eliminazione, aggiunta a cartelle diverse e altre azioni personalizzate.

## 🛠️ Architettura e Tecnologie
ClipVault è strutturato in due principali componenti: il backend e il frontend.

### Backend (.NET)
Il backend utilizza .NET Framework 10.0 e Windows Forms per interagire con la clipboard e gestire i dati dell'applicazione. Le tecnologie principali includono:
- **LiteDB**: Un database NoSQL leggero usato per memorizzare appunti e cartelle.
- **Photino.NET**: Una libreria per creare applicazioni desktop in .NET che possono anche essere distribuite come bundle di browser.
- **TextCopy**: Per l'accesso alla clipboard.

### Frontend (React)
Il frontend è basato su React con Vite come build tool. Le tecnologie principali sono:
- **React**: Framework per la creazione dell'interfaccia utente.
- **Framer Motion**: Libreria per animazioni fluide.
- **react-syntax-highlighter**: Per evidenziare il codice sorgente.
- **react-toastify**: Per notifiche di sistema.

## 🧩 Moduli e Componenti Core
### Backend (.NET)
#### Controllers
- **ClipController**: Gestisce operazioni CRUD per i clip, come la creazione, eliminazione e aggiornamento.
- **FolderController**: Gestisce le operazioni CRUD per le cartelle, inclusa l'eliminazione cascading.

#### Managers
- **FolderManager**: Gestisce l'eliminazione delle cartelle in cascata, rimuovendo tutti i clip associati.

#### Models
- **ClipItem**: Definisce lo schema per un appunto.
- **FolderItem**: Definisce lo schema per una cartella.

#### Repositories
- **ClipRepository**: Interfaccia con il database per operazioni CRUD sui clip.
- **FolderRepository**: Interfaccia con il database per operazioni CRUD sulle cartelle.
- **LiteDbContext**: Contesto del database LiteDB.

#### Services
- **ClipboardMonitorService**: Monitora la clipboard e invia notifiche al frontend.
- **IOsClipboardService**: Interfaccia astratta per l'accesso alla clipboard.
- **MessageRouter**: Rotta messaggi tra il backend e il frontend.
- **TagAnalyzerService**: Analizza contenuti per etichettarli automaticamente.

#### TagRules
- **CodeRule**, **EmailRule**, **ImageRule**, **LinkRule**, **PasswordRule**: Implementano regole di rilevamento per specifici tipi di contenuti.

### Frontend (React)
#### Components
- **ClipCard**: Visualizza un singolo appunto.
- **ClipModal**: Mostra il dettaglio di un appunto.
- **FolderBar**: Barra delle cartelle, permette la creazione e selezione delle cartelle.
- **AppHeader**: Intestazione dell'applicazione con bottoni di ricerca e selezione multipla.
- **CommandPalette**: Per ricerca degli appunti per tag o testo.

#### Hooks
- **useAppManager**: Hook personalizzato per gestire lo stato globale dell'applicazione.
- **useClip**, **useFolder**: Hook utilizzati dai componenti per interagire con i dati degli appunti e delle cartelle.
- **useIPC**: Hook per la comunicazione tra il frontend e il backend.

#### 📝 Application Example
<p align="center">
<img width="400" height="800" alt="Screenshot 2026-04-13 234553" src="https://github.com/user-attachments/assets/7cc72ed4-d77b-44d0-9b43-e77bf3667e34" />
</p>


## 💻 Installazione e Avvio
Per installare ClipVault, eseguire i seguenti comandi:
```bash
cd BackEnd
dotnet restore
dotnet build

cd ../FrontEnd
npm install
npm run dev
```

Questo avvierà l'ambiente di sviluppo del frontend. Per il backend, aprire ClipVault.sln in Visual Studio e eseguire il progetto.

**Nota:** Assicurarsi che tutte le dipendenze richieste siano state installate e configurate correttamente.

## Project Structure:
```text
ClipVault/
├── BackEnd
│   ├── Controllers
│   │   ├── ClipController.cs
│   │   └── FolderController.cs
│   ├── Managers
│   │   └── FolderManager.cs
│   ├── Models
│   │   ├── ClipItem.cs
│   │   └── FolderItem.cs
│   ├── Repositories
│   │   ├── ClipRepository.cs
│   │   ├── FolderRepository.cs
│   │   └── LiteDbContext.cs
│   ├── Services
│   │   ├── ClipBoardMonitorService.cs
│   │   ├── IOsClipboardService.cs
│   │   ├── MessageRouter.cs
│   │   ├── TagAnalyzer.cs
│   │   ├── WindowTracker.cs
│   │   └── WindowsClipboardService.cs
│   ├── TagRules
│   │   ├── CodeRule.cs
│   │   ├── EmailRule.cs
│   │   ├── ITagRule.cs
│   │   ├── ImageRule.cs
│   │   ├── LinkRule.cs
│   │   └── PasswordRule.cs
│   ├── data
│   ├── Backend.csproj
│   └── Program.cs
├── FrontEnd
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── clip
│   │   │   │   ├── card
│   │   │   │   │   ├── CardActions.tsx
│   │   │   │   │   ├── CardEditor.tsx
│   │   │   │   │   └── CardHeadert.tsx
│   │   │   │   ├── modal
│   │   │   │   │   ├── ModalBody.tsx
│   │   │   │   │   └── ModalHeader.tsx
│   │   │   │   ├── ClipCard.tsx
│   │   │   │   ├── ClipContentRenderer.tsx
│   │   │   │   ├── ClipList.tsx
│   │   │   │   └── ClipModal.tsx
│   │   │   ├── folder
│   │   │   │   ├── FolderCreator.tsx
│   │   │   │   └── FolderItem.tsx
│   │   │   ├── AppHeader.tsx
│   │   │   ├── CommandPalette.jsx
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── FolderBar.jsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.js
│   │   ├── hooks
│   │   │   ├── useAppManager.js
│   │   │   ├── useClip.js
│   │   │   ├── useFolder.js
│   │   │   └── useIpc.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── ClipVault.sln
```
