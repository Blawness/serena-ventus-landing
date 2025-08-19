import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { Page } from "../types";

interface CreatePageRequest {
  slug: string;
  title: string;
  subtitle?: string;
  content: Record<string, any>;
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
}

// Creates a new page.
export const createPage = api<CreatePageRequest, Page>(
  { expose: true, method: "POST", path: "/cms/admin/pages" },
  async (req) => {
    // Check if slug already exists
    const existing = await cmsDB.queryRow`
      SELECT id FROM pages WHERE slug = ${req.slug}
    `;
    
    if (existing) {
      throw APIError.alreadyExists("page with this slug already exists");
    }

    const page = await cmsDB.queryRow<{
      id: number;
      slug: string;
      title: string;
      subtitle: string | null;
      content: any;
      meta_title: string | null;
      meta_description: string | null;
      published: boolean;
      created_at: Date;
      updated_at: Date;
    }>`
      INSERT INTO pages (slug, title, subtitle, content, meta_title, meta_description, published)
      VALUES (${req.slug}, ${req.title}, ${req.subtitle || null}, ${JSON.stringify(req.content)}, ${req.metaTitle || null}, ${req.metaDescription || null}, ${req.published || false})
      RETURNING id, slug, title, subtitle, content, meta_title, meta_description, published, created_at, updated_at
    `;

    if (!page) {
      throw APIError.internal("failed to create page");
    }

    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      subtitle: page.subtitle || undefined,
      content: page.content,
      metaTitle: page.meta_title || undefined,
      metaDescription: page.meta_description || undefined,
      published: page.published,
      createdAt: page.created_at,
      updatedAt: page.updated_at,
    };
  }
);
