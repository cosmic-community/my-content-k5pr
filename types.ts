// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image structure from Cosmic file metafields
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Page object
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title?: string;
    content?: string;
    hero_image?: CosmicImage;
    seo_description?: string;
    published?: boolean;
  };
}

// Blog Post object
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    author_name?: string;
    publish_date?: string;
  };
}

// Site Settings object
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_name?: string;
    tagline?: string;
    logo?: CosmicImage;
    footer_text?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}

export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type === 'blog-posts';
}