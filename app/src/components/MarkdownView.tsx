import { ReactNode, Fragment, createElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TERM_REGEX } from '../lib/glossary';
import Term from './Term';

interface MarkdownViewProps {
  markdown: string;
}

/**
 * Wraps glossary terms in a ReactNode tree.
 * Only processes string leaves — React elements pass through untouched
 * (their own component override will handle their children).
 */
function wrapTerms(children: ReactNode): ReactNode {
  if (typeof children === 'string') {
    return wrapStringTerms(children);
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === 'string') {
        return <Fragment key={i}>{wrapStringTerms(child)}</Fragment>;
      }
      return child;
    });
  }
  return children;
}

function wrapStringTerms(s: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  TERM_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TERM_REGEX.exec(s)) !== null) {
    if (m.index > lastIndex) {
      parts.push(s.slice(lastIndex, m.index));
    }
    parts.push(<Term key={`${m.index}-${m[0]}`} match={m[0]} />);
    lastIndex = m.index + m[0].length;
  }
  if (parts.length === 0) return s;
  if (lastIndex < s.length) parts.push(s.slice(lastIndex));
  return <>{parts}</>;
}

// Components, deren Textkinder vom Glossar gewickelt werden sollen.
// Wir überspringen <a> (kollidiert mit Klick) und <code> (kein Wrapping in Code-Blöcken).
const wrapComponent = (tag: string) =>
  ({ children, node: _node, ...props }: any) =>
    createElement(tag, props, wrapTerms(children));

const components = {
  p: wrapComponent('p'),
  li: wrapComponent('li'),
  td: wrapComponent('td'),
  th: wrapComponent('th'),
  strong: wrapComponent('strong'),
  em: wrapComponent('em'),
  blockquote: wrapComponent('blockquote'),
  h1: wrapComponent('h1'),
  h2: wrapComponent('h2'),
  h3: wrapComponent('h3'),
  h4: wrapComponent('h4'),
  h5: wrapComponent('h5'),
  h6: wrapComponent('h6'),
};

export default function MarkdownView({ markdown }: MarkdownViewProps) {
  return (
    <div className="md-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

// Helper für hand-codierte Texte außerhalb von Markdown (z.B. Dashboard-Strings)
export function Glossarized({ children }: { children: ReactNode }) {
  return <>{wrapTerms(children)}</>;
}
