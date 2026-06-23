# My Content

![App Preview](https://imgix.cosmicjs.com/2196afa0-6edc-11f1-9955-7be054cc6fcb-autopilot-photo-1497366754035-f200968a6e72-1782202716046.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern content management system frontend built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). My Content displays your pages, blog posts, and site settings in a clean, fully responsive design.

## Features

- 📝 **Blog** — Browse and read blog posts with featured images, authors, and publish dates
- 📄 **Pages** — Dynamic content pages with hero images and SEO descriptions
- ⚙️ **Site Settings** — Site name, tagline, logo, and footer text managed in Cosmic
- 🎨 **Modern UI** — Clean, responsive design with Tailwind CSS
- ⚡ **Server Components** — Fast, SEO-friendly server-side rendering
- 🔍 **SEO Optimized** — Dynamic metadata from your content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3a412e5b2ac5cef3dfeaf6&clone_repository=6a3a41e35b2ac5cef3dfeb54)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a headless CMS backend with pages, blog posts, and site settings.
>
> User instructions: this is a testing project"

### Code Generation Prompt

> Build a Next.js application for a content management system called "My Content". The content is managed in Cosmic CMS with the following object types: pages, blog-posts, site-settings. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: this is a testing project

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — App Router with React Server Components
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `pages`, `blog-posts`, and `site-settings` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are provided automatically when you deploy via Cosmic):

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all blog posts
const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single page by slug
const { object: page } = await cosmic.objects
  .findOne({ type: 'pages', slug: 'about' })
  .depth(1)
```

## Cosmic CMS Integration

This application reads content directly from your Cosmic bucket using the [Cosmic SDK](https://www.cosmicjs.com/docs). All data fetching happens server-side in React Server Components, keeping your API keys secure.

- **Pages** → `app/[slug]/page.tsx`
- **Blog Posts** → `app/blog/[slug]/page.tsx`
- **Site Settings** → Loaded in the root layout for header & footer

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add your `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Add the environment variables in Site Settings
3. Deploy

<!-- README_END -->