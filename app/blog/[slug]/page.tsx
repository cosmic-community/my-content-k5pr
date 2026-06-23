// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/format'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const description = getMetafieldValue(post.metadata?.excerpt)

  return {
    title,
    description,
    other: {
      'cosmic-context': JSON.stringify({ object_id: post.id, object_type: post.type }),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const author = getMetafieldValue(post.metadata?.author_name)
  const date = formatDate(post.metadata?.publish_date)
  const content = getMetafieldValue(post.metadata?.content)
  const image = post.metadata?.featured_image

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          {author && <span className="font-medium text-gray-700">{author}</span>}
          {author && date && <span>·</span>}
          {date && <span>{date}</span>}
        </div>
      </header>

      {image?.imgix_url && (
        <div className="mb-8 overflow-hidden rounded-xl bg-gray-100">
          <img
            src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={450}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {content ? (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-gray-600">No content available.</p>
      )}
    </article>
  )
}