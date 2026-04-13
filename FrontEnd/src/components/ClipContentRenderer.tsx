import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodePre = ({ children, style, ...rest }: any) => (
  <pre{...rest} style={{...style, whiteSpace: 'pre', overflowX: 'auto', margin: 0, padding: '12px', fontSize: '13px', fontFamily: '"Consolas", "Monaco", monospace'}}>
    {children}
  </pre>
);

const Renderers = {
  code: ({ content }: any) => {
    const formattedContent = typeof content === 'string'? content.replace(/\r\n/g, '\n').replace(/\r/g, '\n'): String(content ?? '');
    return (
      <div style={{borderRadius: '6px', border: '1px solid #3c3c3c', backgroundColor: '#1e1e1e', maxWidth: '100%', minWidth: 0, overflowX: 'auto',}}>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus} PreTag={CodePre} useInlineStyles={true} wrapLines={false} wrapLongLines={false} codeTagProps={{ style: { whiteSpace: 'pre', display: 'block' }}}
        customStyle={{background: 'transparent', margin: 0, overflowX: 'visible', minWidth: 'max-content', }}>
          {formattedContent}
        </SyntaxHighlighter>
      </div>
    );
  },

  password: ({ content }:any) => (
    <div style={{ display: 'inline-flex', padding: '6px 10px', border: '1px solid rgba(220, 53, 69, 0.4)', borderRadius: '4px', color: '#ff6b6b', fontFamily: '"Consolas", "Monaco", monospace', fontSize: '14px' }}>
      {content}
    </div>
  ),

  link: ({ content }:any) => {
    const href = content.startsWith('http') ? content : `https://${content}`;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff', textDecoration: 'underline', wordBreak: 'break-all', fontSize: '14px' }}>
        {content}
      </a>
    );
  },

  email: ({ content }:any) => (
    <a href={`mailto:${content}`} style={{ color: '#a371f7', textDecoration: 'underline dotted', fontSize: '14px' }}>
      {content}
    </a>
  ),

  image: ({ content }:any) => (
    <img src={content} alt="Clip" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }} />
  ),

  text: ({ content }:any) => (
    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: '1.5', color: '#e1e1e1' }}>
      {content}
    </pre>
  )
};

export function ClipContentRenderer({ clip, isModal = false }:any) {
  let activeStrategy: keyof typeof Renderers = 'text';
  if (clip.Type === 'Image')  activeStrategy = 'image';
  else if (clip.Tags && clip.Tags.length > 0) {
    const primaryTag = clip.Tags[0].toLowerCase()  as keyof typeof Renderers;;
    if (Renderers[primaryTag]) activeStrategy = primaryTag;
  }
  const ActiveRenderer = Renderers[activeStrategy];
  return (
    <div style={{ flex: 1,  overflowY: isModal ? 'auto' : 'hidden',  maxHeight: isModal ? 'none' : '250px', textAlign: activeStrategy === 'image' ? 'center' : 'left'}}>
      <ActiveRenderer content={clip.Content} />
    </div>
  );
}