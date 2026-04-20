'use client'

import { useState } from 'react'
import { Check, Link as LinkIcon } from 'lucide-react'

type Props = {
  title: string
  slug: string
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 4 L6 20 M6 4 L18 20" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.8-5.5A8 8 0 1 1 8.5 19.2L3 21z" />
      <path d="M8.5 10c.5 1.5 1.8 3 3.5 3.5" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7 M8 7.5v.01 M12 17v-4a2 2 0 0 1 4 0v4 M12 10v7" />
    </svg>
  )
}

const CANONICAL_ORIGIN = 'https://dominium.com.ar'

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false)

  const canonicalUrl = `${CANONICAL_ORIGIN}/blog/${slug}`

  const handleCopy = async () => {
    const current =
      typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : canonicalUrl
    try {
      await navigator.clipboard.writeText(current)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  const text = encodeURIComponent(title)
  const link = encodeURIComponent(canonicalUrl)

  const shares = [
    {
      label: 'Compartir en X',
      href: `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      icon: <XIcon />,
    },
    {
      label: 'Compartir en WhatsApp',
      href: `https://wa.me/?text=${text}%20${link}`,
      icon: <WhatsAppIcon />,
    },
    {
      label: 'Compartir en LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
      icon: <LinkedInIcon />,
    },
  ]

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[12px] mr-1"
        style={{ color: 'var(--color-ink-tertiary)' }}
      >
        Compartir
      </span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-ink-secondary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.color = 'var(--color-accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-ink-secondary)'
          }}
        >
          {s.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copiado' : 'Copiar link del artículo'}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150"
        style={{
          border: `1px solid ${copied ? 'var(--color-accent)' : 'var(--color-border)'}`,
          backgroundColor: copied ? 'var(--color-accent-glow)' : 'var(--color-surface)',
          color: copied ? 'var(--color-accent)' : 'var(--color-ink-secondary)',
        }}
      >
        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
      </button>
    </div>
  )
}
