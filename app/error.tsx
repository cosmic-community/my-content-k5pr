'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">⚠️</span>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-gray-600">An unexpected error occurred while loading this page.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Try Again
      </button>
    </div>
  )
}