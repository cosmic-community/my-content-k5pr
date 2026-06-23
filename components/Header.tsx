import Link from 'next/link'
import { SiteSettings } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HeaderProps {
  settings: SiteSettings | null
}

export default function Header({ settings }: HeaderProps) {
  const siteName = getMetafieldValue(settings?.metadata?.site_name) || 'My Content'
  const logo = settings?.metadata?.logo

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          {logo?.imgix_url ? (
            <img
              src={`${logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={siteName}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <span className="text-2xl">📝</span>
          )}
          <span className="text-lg font-bold text-gray-900">{siteName}</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="transition-colors hover:text-brand-600">
            Home
          </Link>
          <Link href="/blog" className="transition-colors hover:text-brand-600">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}