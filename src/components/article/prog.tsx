
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProgProps {
  children: string;
  language?: string;
}

const Prog: React.FC<ProgProps> = ({ children, language = 'javascript' }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Prog;