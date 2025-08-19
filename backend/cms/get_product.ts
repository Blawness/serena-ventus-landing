import { api, APIError } from "encore.dev/api";
import { cmsDB } from "./db";
import type { Product } from "./types";

interface GetProductParams {
  slug: string;
}

// Retrieves a product by its slug.
export const getProduct = api<GetProductParams, Product>(
  { expose: true, method: "GET", path: "/cms/products/:slug" },
  async ({ slug }) => {
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
      SELECT id, name, slug, description, long_description, price, size, notes, images, featured, published, sort_order, created_at, updated_at
      FROM products 
      WHERE slug = ${slug} AND published = true
    `;

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
