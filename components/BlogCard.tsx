import Link from 'next/link'
import { BlogPost } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/format'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = getMetafieldValue(post.metadata?.author_name)
  const date = formatDate(post.metadata?.publish_date)
  const image = post.metadata?.featured_image

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {image?.imgix_url ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-brand-50 text-4xl">
          📝
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-600">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          {author && <span className="font-medium text-gray-700">{author}</span>}
          {author && date && <span>·</span>}
          {date && <span>{date}</span>}
        </div>
      </div>
    </Link>
  )
}