import type { ContentBlock } from '@/lib/blog'
import { Fragment, type ReactNode } from 'react'

// Lightweight inline formatter: **bold**, *italic*, `code`, [text](url)
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      nodes.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded text-[0.9em] font-medium"
          style={{
            backgroundColor: 'var(--color-surface-alt)',
            color: 'var(--color-accent)',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (linkMatch) {
        nodes.push(
          <a
            key={key++}
            href={linkMatch[2]}
            className="underline underline-offset-2 transition-colors duration-150"
            style={{ color: 'var(--color-accent)' }}
          >
            {linkMatch[1]}
          </a>,
        )
      }
    }
    lastIndex = match.index + token.length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

export default function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p
                key={i}
                className="text-[17px] leading-[1.75]"
                style={{ color: 'var(--color-ink)' }}
              >
                {renderInline(block.text)}
              </p>
            )
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="font-serif font-bold leading-[1.2] text-balance pt-4 scroll-mt-24"
                style={{
                  fontSize: 'clamp(24px, 3vw, 30px)',
                  color: 'var(--color-ink)',
                }}
              >
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={i}
                id={block.id}
                className="font-serif font-semibold leading-[1.25] pt-2 scroll-mt-24"
                style={{
                  fontSize: 'clamp(19px, 2.2vw, 22px)',
                  color: 'var(--color-ink)',
                }}
              >
                {block.text}
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span
                      className="mt-[11px] w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[17px] leading-[1.7]"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {renderInline(item)}
                    </span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span
                      className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-semibold"
                      style={{
                        backgroundColor: 'var(--color-accent-glow)',
                        color: 'var(--color-accent)',
                      }}
                      aria-hidden="true"
                    >
                      {j + 1}
                    </span>
                    <span
                      className="text-[17px] leading-[1.7] pt-[2px]"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {renderInline(item)}
                    </span>
                  </li>
                ))}
              </ol>
            )
          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="relative pl-6 py-3 italic rounded-r-lg"
                style={{
                  borderLeft: '3px solid var(--color-accent)',
                  color: 'var(--color-ink)',
                }}
              >
                <p className="text-[18px] leading-[1.6] font-serif">
                  {renderInline(block.text)}
                </p>
                {block.attribution && (
                  <footer
                    className="mt-3 text-[13px] not-italic"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            )
          case 'table':
            return (
              <figure
                key={i}
                className="rounded-[12px] overflow-hidden"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="px-4 py-3 text-[13px] font-semibold uppercase tracking-wide"
                            style={{
                              color: 'var(--color-ink-secondary)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          style={{
                            borderTop: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-surface)',
                          }}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-4 py-3 text-[14.5px] leading-[1.55] align-top"
                              style={{ color: 'var(--color-ink)' }}
                            >
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption
                    className="px-4 py-2 text-[12px]"
                    style={{
                      color: 'var(--color-ink-tertiary)',
                      borderTop: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-alt)',
                    }}
                  >
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          case 'callout': {
            const isWarn = block.tone === 'warn'
            return (
              <aside
                key={i}
                role="note"
                className="rounded-[12px] p-5 flex flex-col gap-1.5"
                style={{
                  backgroundColor: isWarn ? '#FFFBEB' : 'var(--color-accent-glow)',
                  border: `1px solid ${isWarn ? '#FCD34D' : '#B6E8CC'}`,
                }}
              >
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: isWarn ? '#B45309' : 'var(--color-accent)' }}
                >
                  {block.title}
                </p>
                <p
                  className="text-[15.5px] leading-[1.65]"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {renderInline(block.text)}
                </p>
              </aside>
            )
          }
          default:
            return <Fragment key={i} />
        }
      })}
    </div>
  )
}
