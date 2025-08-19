import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { Page } from "../types";

interface UpdatePageParams {
  id: number;
}

interface UpdatePageRequest {
  title?: string;
  subtitle?: string;
  content?: Record<string, any>;
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
}

// Updates an existing page.
export const updatePage = api<UpdatePageParams & UpdatePageRequest, Page>(
  { expose: true, method: "PUT", path: "/cms/admin/pages/:id" },
  async ({ id, ...updates }) => {
    const setParts: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      setParts.push(`title = $${paramIndex++}`);
      params.push(updates.title);
    }
    
    if (updates.subtitle !== undefined) {
      setParts.push(`subtitle = $${paramIndex++}`);
      params.push(updates.subtitle);
    }
    
    if (updates.content !== undefined) {
      setParts.push(`content = $${paramIndex++}`);
      params.push(JSON.stringify(updates.content));
    }
    
    if (updates.metaTitle !== undefined) {
      setParts.push(`meta_title = $${paramIndex++}`);
      params.push(updates.metaTitle);
    }
    
    if (updates.metaDescription !== undefined) {
      setParts.push(`meta_description = $${paramIndex++}`);
      params.push(updates.metaDescription);
    }
    
    if (updates.published !== undefined) {
      setParts.push(`published = $${paramIndex++}`);
      params.push(updates.published);
    }

    if (setParts.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    setParts.push(`updated_at = NOW()`);

    const query = `
      UPDATE pages 
      SET ${setParts.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, slug, title, subtitle, content, meta_title, meta_description, published, created_at, updated_at
    `;
    params.push(id);

    const page = await cmsDB.rawQueryRow<{
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
    }>(query, ...params);

    if (!page) {
      throw APIError.notFound("page not found");
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
