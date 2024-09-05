import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProgProps {
  children: React.ReactNode;
  language?: string;
}

const Prog: React.FC<ProgProps> = ({ children, language = 'javascript' }) => {
  // Assurez-vous que children est une chaîne de caractères
  const content = React.Children.toArray(children).join('\n');
  
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {content}
    </SyntaxHighlighter>
  );
};

export default Prog;