import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Browse all blog posts',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mt-2 text-gray-600">All our latest articles and updates.</p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          No blog posts found.
        </p>
      )}
    </div>
  )
}