import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { ContentBlock } from "../types";

interface UpdateContentBlockParams {
  id: number;
}

interface UpdateContentBlockRequest {
  type?: string;
  title?: string;
  content?: Record<string, any>;
  pageSlug?: string;
  sortOrder?: number;
  published?: boolean;
}

// Updates an existing content block.
export const updateContentBlock = api<UpdateContentBlockParams & UpdateContentBlockRequest, ContentBlock>(
  { expose: true, method: "PUT", path: "/cms/admin/content-blocks/:id" },
  async ({ id, ...updates }) => {
    const setParts: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updates.type !== undefined) {
      setParts.push(`type = $${paramIndex++}`);
      params.push(updates.type);
    }
    
    if (updates.title !== undefined) {
      setParts.push(`title = $${paramIndex++}`);
      params.push(updates.title);
    }
    
    if (updates.content !== undefined) {
      setParts.push(`content = $${paramIndex++}`);
      params.push(JSON.stringify(updates.content));
    }
    
    if (updates.pageSlug !== undefined) {
      setParts.push(`page_slug = $${paramIndex++}`);
      params.push(updates.pageSlug);
    }
    
    if (updates.sortOrder !== undefined) {
      setParts.push(`sort_order = $${paramIndex++}`);
      params.push(updates.sortOrder);
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
      UPDATE content_blocks 
      SET ${setParts.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, type, title, content, page_slug, sort_order, published, created_at, updated_at
    `;
    params.push(id);

    const block = await cmsDB.rawQueryRow<{
      id: number;
      type: string;
      title: string | null;
      content: any;
      page_slug: string | null;
      sort_order: number;
      published: boolean;
      created_at: Date;
      updated_at: Date;
    }>(query, ...params);

    if (!block) {
      throw APIError.notFound("content block not found");
    }

    return {
      id: block.id,
      type: block.type,
      title: block.title || undefined,
      content: block.content,
      pageSlug: block.page_slug || undefined,
      sortOrder: block.sort_order,
      published: block.published,
      createdAt: block.created_at,
      updatedAt: block.updated_at,
    };
  }
);
