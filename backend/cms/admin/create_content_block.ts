import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { ContentBlock } from "../types";

interface CreateContentBlockRequest {
  type: string;
  title?: string;
  content: Record<string, any>;
  pageSlug?: string;
  sortOrder?: number;
  published?: boolean;
}

// Creates a new content block.
export const createContentBlock = api<CreateContentBlockRequest, ContentBlock>(
  { expose: true, method: "POST", path: "/cms/admin/content-blocks" },
  async (req) => {
    const block = await cmsDB.queryRow<{
      id: number;
      type: string;
      title: string | null;
      content: any;
      page_slug: string | null;
      sort_order: number;
      published: boolean;
      created_at: Date;
      updated_at: Date;
    }>`
      INSERT INTO content_blocks (type, title, content, page_slug, sort_order, published)
      VALUES (${req.type}, ${req.title || null}, ${JSON.stringify(req.content)}, ${req.pageSlug || null}, ${req.sortOrder || 0}, ${req.published || false})
      RETURNING id, type, title, content, page_slug, sort_order, published, created_at, updated_at
    `;

    if (!block) {
      throw APIError.internal("failed to create content block");
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
