import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { cmsDB } from "./db";
import type { Product } from "./types";

interface ListProductsParams {
  featured?: Query<boolean>;
  limit?: Query<number>;
}

interface ListProductsResponse {
  products: Product[];
}

// Lists all published products.
export const listProducts = api<ListProductsParams, ListProductsResponse>(
  { expose: true, method: "GET", path: "/cms/products" },
  async ({ featured, limit }) => {
    let query = `
      SELECT id, name, slug, description, long_description, price, size, notes, images, featured, published, sort_order, created_at, updated_at
      FROM products 
      WHERE published = true
    `;
    
    const params: any[] = [];
    
    if (featured !== undefined) {
      query += ` AND featured = $${params.length + 1}`;
      params.push(featured);
    }
    
    query += ` ORDER BY sort_order ASC, created_at DESC`;
    
    if (limit !== undefined) {
      query += ` LIMIT $${params.length + 1}`;
      params.push(limit);
    }

    const products = await cmsDB.rawQueryAll<{
      id: number;
      name: string;
      slug: string;
      description: string | null;
      long_description: string | null;
      price: number;
      size: string | null;
      notes: any;
      images: any;
      featured: boolean;
      published: boolean;
      sort_order: number;
      created_at: Date;
      updated_at: Date;
    }>(query, ...params);

    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description || undefined,
        longDescription: product.long_description || undefined,
        price: product.price,
        size: product.size || undefined,
        notes: product.notes,
        images: product.images,
        featured: product.featured,
        published: product.published,
        sortOrder: product.sort_order,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      }))
    };
  }
);
