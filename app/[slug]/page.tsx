// app/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage, getMetafieldValue } from '@/lib/cosmic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const title = getMetafieldValue(page.metadata?.title) || page.title
  const description = getMetafieldValue(page.metadata?.seo_description)

  return {
    title,
    description,
    other: {
      'cosmic-context': JSON.stringify({ object_id: page.id, object_type: page.type }),
    },
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page || page.metadata?.published === false) {
    notFound()
  }

  const title = getMetafieldValue(page.metadata?.title) || page.title
  const content = getMetafieldValue(page.metadata?.content)
  const heroImage = page.metadata?.hero_image

  return (
    <article>
      {heroImage?.imgix_url ? (
        <div className="relative h-64 w-full overflow-hidden bg-gray-200 sm:h-80 md:h-96">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={title}
            width={1000}
            height={400}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="px-4 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      ) : (
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {content ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-600">No content available.</p>
        )}
      </div>
    </article>
  )
}