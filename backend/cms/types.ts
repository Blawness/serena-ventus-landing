export interface Page {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  content: Record<string, any>;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  price: number;
  size?: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  images: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentBlock {
  id: number;
  type: string;
  title?: string;
  content: Record<string, any>;
  pageSlug?: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText?: string;
  caption?: string;
  createdAt: Date;
}
