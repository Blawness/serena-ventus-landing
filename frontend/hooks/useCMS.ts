import { useState, useEffect } from 'react';
import backend from '~backend/client';
import type { Page, Product, ContentBlock } from '~backend/cms/types';

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const result = await backend.cms.getPage({ slug });
        setPage(result);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch page');
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
}

export function useProducts(featured?: boolean, limit?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await backend.cms.listProducts({ featured, limit });
        setProducts(result.products);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featured, limit]);

  return { products, loading, error };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await backend.cms.getProduct({ slug });
        setProduct(result);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

export function useContentBlocks(pageSlug?: string, type?: string) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const result = await backend.cms.listContentBlocks({ pageSlug, type });
        setBlocks(result.blocks);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch content blocks:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch content blocks');
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [pageSlug, type]);

  return { blocks, loading, error };
}
