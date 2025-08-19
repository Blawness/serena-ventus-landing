import { api } from "encore.dev/api";
import { cmsDB } from "./db";
import type { Page } from "./types";

interface ListPagesResponse {
  pages: Page[];
}

// Lists all published pages.
export const listPages = api<void, ListPagesResponse>(
  { expose: true, method: "GET", path: "/cms/pages" },
  async () => {
    const pages = await cmsDB.queryAll<{
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
      SELECT id, slug, title, subtitle, content, meta_title, meta_description, published, created_at, updated_at
      FROM pages 
      WHERE published = true
      ORDER BY slug
    `;

    return {
      pages: pages.map(page => ({
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
      }))
    };
  }
);
