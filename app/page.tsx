import Link from 'next/link'
import { getBlogPosts, getPages, getSiteSettings, getMetafieldValue } from '@/lib/cosmic'
import BlogCard from '@/components/BlogCard'

export default async function HomePage() {
  const [posts, pages, settings] = await Promise.all([
    getBlogPosts(),
    getPages(),
    getSiteSettings(),
  ])

  const siteName = getMetafieldValue(settings?.metadata?.site_name) || 'My Content'
  const tagline =
    getMetafieldValue(settings?.metadata?.tagline) || 'A modern content management system powered by Cosmic.'

  const recentPosts = posts.slice(0, 6)
  const publishedPages = pages.filter((p) => p.metadata?.published !== false)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {siteName}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">{tagline}</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/blog"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
            <p className="mt-1 text-sm text-gray-500">Fresh from the blog</p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            No blog posts yet. Add some in your Cosmic bucket!
          </p>
        )}
      </section>

      {/* Pages */}
      {publishedPages.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Explore Pages</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {publishedPages.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <span className="text-2xl">📄</span>
                  <span className="font-medium text-gray-900 group-hover:text-brand-600">
                    {getMetafieldValue(page.metadata?.title) || page.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}