import { api, APIError } from "encore.dev/api";
import { cmsDB } from "../db";
import type { Product } from "../types";

interface CreateProductRequest {
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
  images?: string[];
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
}

// Creates a new product.
export const createProduct = api<CreateProductRequest, Product>(
  { expose: true, method: "POST", path: "/cms/admin/products" },
  async (req) => {
    // Check if slug already exists
    const existing = await cmsDB.queryRow`
      SELECT id FROM products WHERE slug = ${req.slug}
    `;
    
    if (existing) {
      throw APIError.alreadyExists("product with this slug already exists");
    }

    const product = await cmsDB.queryRow<{
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
    }>`
      INSERT INTO products (name, slug, description, long_description, price, size, notes, images, featured, published, sort_order)
      VALUES (${req.name}, ${req.slug}, ${req.description || null}, ${req.longDescription || null}, ${req.price}, ${req.size || null}, ${JSON.stringify(req.notes)}, ${JSON.stringify(req.images || [])}, ${req.featured || false}, ${req.published || false}, ${req.sortOrder || 0})
      RETURNING id, name, slug, description, long_description, price, size, notes, images, featured, published, sort_order, created_at, updated_at
    `;

    if (!product) {
      throw APIError.internal("failed to create product");
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
