import { ReactNode, useRef, useEffect, useState } from 'react';
import { lookupTerm } from '../lib/glossary';

interface TermProps {
  /** Exakter Match-Text (für Auto-Wrap) */
  match?: string;
  /** Manueller Lookup-Key (für hand-codiertes JSX) */
  name?: string;
  /** Sichtbarer Inhalt, wenn vom Match abweichend */
  children?: ReactNode;
}

/**
 * Term — wrappt einen Fachbegriff mit dezent gestricheltem Underline + Hover-Tooltip.
 *
 * Tooltip-Positionierung: standardmäßig unter dem Begriff. Wenn nicht genug Platz nach unten,
 * flippt es nach oben. Wenn horizontal überfließt, wird die Position via useEffect korrigiert.
 */
export default function Term({ match, name, children }: TermProps) {
  const lookup = name || match;
  const entry = lookup ? lookupTerm(lookup) : undefined;

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ side: 'top' | 'bottom'; offsetX: number }>({ side: 'bottom', offsetX: 0 });

  useEffect(() => {
    if (!open || !wrapperRef.current || !tooltipRef.current) return;
    const wr = wrapperRef.current.getBoundingClientRect();
    const tr = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Flip vertically if not enough space below
    const spaceBelow = vh - wr.bottom;
    const spaceAbove = wr.top;
    const side = spaceBelow < tr.height + 16 && spaceAbove > spaceBelow ? 'top' : 'bottom';

    // Horizontal offset if tooltip would overflow viewport
    const center = wr.left + wr.width / 2;
    const tooltipHalfWidth = tr.width / 2;
    const padding = 12;
    let offsetX = 0;
    if (center - tooltipHalfWidth < padding) {
      offsetX = padding - (center - tooltipHalfWidth);
    } else if (center + tooltipHalfWidth > vw - padding) {
      offsetX = vw - padding - (center + tooltipHalfWidth);
    }

    setPos({ side, offsetX });
  }, [open]);

  if (!entry) {
    return <>{children ?? match}</>;
  }

  return (
    <span
      ref={wrapperRef}
      className="term"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      role="button"
      aria-expanded={open}
      aria-describedby={`term-tooltip-${entry.key}`}
    >
      {children ?? match ?? entry.display}
      <span
        ref={tooltipRef}
        id={`term-tooltip-${entry.key}`}
        role="tooltip"
        className="term-tooltip"
        data-side={pos.side}
        style={{
          transform: `translateX(calc(-50% + ${pos.offsetX}px))`,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <strong>{entry.display}</strong>
        <span className="term-tooltip-body">{entry.short}</span>
      </span>
    </span>
  );
}
