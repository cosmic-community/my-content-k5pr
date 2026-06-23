import { SiteSettings } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FooterProps {
  settings: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const siteName = getMetafieldValue(settings?.metadata?.site_name) || 'My Content'
  const footerText =
    getMetafieldValue(settings?.metadata?.footer_text) ||
    `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6">
        <p>{footerText}</p>
      </div>
    </footer>
  )
}