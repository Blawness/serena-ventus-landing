import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { cmsDB } from "./db";
import type { ContentBlock } from "./types";

interface ListContentBlocksParams {
  pageSlug?: Query<string>;
  type?: Query<string>;
}

interface ListContentBlocksResponse {
  blocks: ContentBlock[];
}

// Lists content blocks for a page or by type.
export const listContentBlocks = api<ListContentBlocksParams, ListContentBlocksResponse>(
  { expose: true, method: "GET", path: "/cms/content-blocks" },
  async ({ pageSlug, type }) => {
    let query = `
      SELECT id, type, title, content, page_slug, sort_order, published, created_at, updated_at
      FROM content_blocks 
      WHERE published = true
    `;
    
    const params: any[] = [];
    
    if (pageSlug !== undefined) {
      query += ` AND page_slug = $${params.length + 1}`;
      params.push(pageSlug);
    }
    
    if (type !== undefined) {
      query += ` AND type = $${params.length + 1}`;
      params.push(type);
    }
    
    query += ` ORDER BY sort_order ASC, created_at DESC`;

    const blocks = await cmsDB.rawQueryAll<{
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

    return {
      blocks: blocks.map(block => ({
        id: block.id,
        type: block.type,
        title: block.title || undefined,
        content: block.content,
        pageSlug: block.page_slug || undefined,
        sortOrder: block.sort_order,
        published: block.published,
        createdAt: block.created_at,
        updatedAt: block.updated_at,
      }))
    };
  }
);
