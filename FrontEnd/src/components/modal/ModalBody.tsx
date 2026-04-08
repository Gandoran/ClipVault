export function ModalBody({ content }:any) {
  return(
  <div style={{ padding: '20px', overflowY: 'auto', flex: 1, textAlign: 'left' }}>
    <pre style={{ 
      margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', 
      fontFamily: "Consolas, Monaco, monospace", fontSize: '13px', 
      color: '#d4d4d4', lineHeight: '1.5', textAlign: 'left'
    }}>
      {content}
    </pre>
  </div>
  )
}