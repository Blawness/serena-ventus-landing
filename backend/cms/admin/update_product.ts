import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { Product } from "../types";

interface UpdateProductParams {
  id: number;
}

interface UpdateProductRequest {
  name?: string;
  description?: string;
  longDescription?: string;
  price?: number;
  size?: string;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  images?: string[];
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
}

// Updates an existing product.
export const updateProduct = api<UpdateProductParams & UpdateProductRequest, Product>(
  { expose: true, method: "PUT", path: "/cms/admin/products/:id" },
  async ({ id, ...updates }) => {
    const setParts: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      setParts.push(`name = $${paramIndex++}`);
      params.push(updates.name);
    }
    
    if (updates.description !== undefined) {
      setParts.push(`description = $${paramIndex++}`);
      params.push(updates.description);
    }
    
    if (updates.longDescription !== undefined) {
      setParts.push(`long_description = $${paramIndex++}`);
      params.push(updates.longDescription);
    }
    
    if (updates.price !== undefined) {
      setParts.push(`price = $${paramIndex++}`);
      params.push(updates.price);
    }
    
    if (updates.size !== undefined) {
      setParts.push(`size = $${paramIndex++}`);
      params.push(updates.size);
    }
    
    if (updates.notes !== undefined) {
      setParts.push(`notes = $${paramIndex++}`);
      params.push(JSON.stringify(updates.notes));
    }
    
    if (updates.images !== undefined) {
      setParts.push(`images = $${paramIndex++}`);
      params.push(JSON.stringify(updates.images));
    }
    
    if (updates.featured !== undefined) {
      setParts.push(`featured = $${paramIndex++}`);
      params.push(updates.featured);
    }
    
    if (updates.published !== undefined) {
      setParts.push(`published = $${paramIndex++}`);
      params.push(updates.published);
    }
    
    if (updates.sortOrder !== undefined) {
      setParts.push(`sort_order = $${paramIndex++}`);
      params.push(updates.sortOrder);
    }

    if (setParts.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    setParts.push(`updated_at = NOW()`);

    const query = `
      UPDATE products 
      SET ${setParts.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, name, slug, description, long_description, price, size, notes, images, featured, published, sort_order, created_at, updated_at
    `;
    params.push(id);

    const product = await cmsDB.rawQueryRow<{
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

    if (!product) {
      throw APIError.notFound("product not found");
    }

    return {
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
    };
  }
);
