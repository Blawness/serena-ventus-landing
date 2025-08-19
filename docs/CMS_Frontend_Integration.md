# CMS Frontend Integration Guide

This guide explains how to integrate and use the CMS system in the frontend application.

## Overview

The CMS system provides a seamless way to manage dynamic content in the Serena Ventus application. Content is managed through backend APIs and consumed by React components using custom hooks and utilities.

## Getting Started

### 1. Import the Backend Client

All CMS functionality is available through the auto-generated backend client:

```typescript
import backend from '~backend/client';
```

### 2. Use Custom Hooks

The application provides custom hooks for common CMS operations:

```typescript
import { usePage, useProducts, useProduct, useContentBlocks } from '../hooks/useCMS';
```

## Available Hooks

### usePage(slug: string)

Fetches a single page by its slug.

```typescript
function AboutPage() {
  const { page, loading, error } = usePage('about');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{page?.title}</h1>
      <p>{page?.subtitle}</p>
      <CMSContent content={page?.content || {}} />
    </div>
  );
}
```

### useProducts(featured?: boolean, limit?: number)

Fetches a list of products with optional filtering.

```typescript
function ProductsSection() {
  const { products, loading, error } = useProducts(true, 3); // Featured products, limit 3
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### useProduct(slug: string)

Fetches a single product by its slug.

```typescript
function ProductDetail({ slug }: { slug: string }) {
  const { product, loading, error } = useProduct(slug);
  
  if (!product) return <div>Product not found</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
    </div>
  );
}
```

### useContentBlocks(pageSlug?: string, type?: string)

Fetches content blocks with optional filtering.

```typescript
function DynamicContent() {
  const { blocks, loading, error } = useContentBlocks('home', 'hero');
  
  return (
    <div>
      {blocks.map(block => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
```

## Components

### CMSContent Component

The `CMSContent` component automatically renders CMS content based on its structure:

```typescript
import CMSContent from '../components/CMSContent';

function PageRenderer() {
  const { page } = usePage('home');
  
  return (
    <div>
      <CMSContent content={page?.content || {}} />
    </div>
  );
}
```

The component supports various content types:

- **hero**: Full-screen hero sections
- **story**: Story/narrative sections
- **intro**: Introduction sections
- **info**: Information sections
- **custom**: Generic content blocks

### ProductCard Component

Displays product information in a card format:

```typescript
import ProductCard from '../components/ProductCard';
import type { Product } from '~backend/cms/types';

function ProductGrid() {
  const { products } = useProducts();
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onDiscover={(product) => {
            // Handle product discovery action
            console.log('Discover product:', product);
          }}
        />
      ))}
    </div>
  );
}
```

## Content Structure Examples

### Page Content

Pages use flexible JSON structures for content:

```json
{
  "hero": {
    "title": "SERENA VENTUS",
    "subtitle": "Where elegance meets essence"
  },
  "story": {
    "title": "OUR STORY",
    "content": "Founded in 2018, Serena Ventus emerged..."
  },
  "sections": [
    {
      "type": "text",
      "title": "Our Mission",
      "content": "To create exceptional fragrances..."
    }
  ]
}
```

### Product Structure

Products include comprehensive information:

```typescript
interface Product {
  id: number;
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
  images: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Handling

All hooks include error handling:

```typescript
function SafeComponent() {
  const { page, loading, error } = usePage('home');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-white/60">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    console.error('Failed to load page:', error);
    return (
      <div className="text-center text-red-400">
        <p>Failed to load content</p>
        <p className="text-sm text-white/60">{error}</p>
      </div>
    );
  }
  
  return <div>{/* Render content */}</div>;
}
```

## TypeScript Integration

Import types from the backend for type safety:

```typescript
import type { Page, Product, ContentBlock } from '~backend/cms/types';

interface PageProps {
  page: Page;
}

function PageComponent({ page }: PageProps) {
  return (
    <div>
      <h1>{page.title}</h1>
      {page.subtitle && <p>{page.subtitle}</p>}
    </div>
  );
}
```

## Performance Considerations

### Loading States

Always handle loading states for better UX:

```typescript
function OptimizedComponent() {
  const { products, loading } = useProducts();
  
  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-8 h-96 animate-pulse" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Conditional Rendering

Only render content when available:

```typescript
function ConditionalContent() {
  const { page } = usePage('home');
  
  return (
    <div>
      {page?.content?.hero && (
        <HeroSection content={page.content.hero} />
      )}
      
      {page?.content?.story && (
        <StorySection content={page.content.story} />
      )}
    </div>
  );
}
```

## Best Practices

### 1. Use Semantic Component Names

```typescript
// Good
function FeaturedProductsSection() {
  const { products } = useProducts(true, 3);
  // ...
}

// Avoid
function ProductsComponent() {
  // ...
}
```

### 2. Handle Empty States

```typescript
function ProductList() {
  const { products, loading } = useProducts();
  
  if (loading) return <LoadingSpinner />;
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No products available</p>
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 3. Memoize Expensive Operations

```typescript
import { useMemo } from 'react';

function FilteredProducts() {
  const { products } = useProducts();
  
  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products]);
  
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 4. Use Proper Key Props

```typescript
// Good - using unique ID
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}

// Avoid - using array index
{products.map((product, index) => (
  <ProductCard key={index} product={product} />
))}
```

## Styling Integration

The CMS components integrate with the application's design system:

```typescript
function StyledCMSContent({ content }: { content: Record<string, any> }) {
  return (
    <div className="space-y-16">
      <CMSContent 
        content={content} 
        className="prose prose-invert max-w-none" 
      />
    </div>
  );
}
```

## Animation Integration

Components work seamlessly with Framer Motion:

```typescript
import { motion } from 'framer-motion';

function AnimatedProductGrid() {
  const { products } = useProducts();
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
```

This integration guide provides everything needed to effectively use the CMS system in the frontend application while maintaining performance, type safety, and design consistency.
