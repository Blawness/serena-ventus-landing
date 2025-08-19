# CMS API Documentation

This document provides comprehensive information about the Content Management System (CMS) API endpoints available in the Serena Ventus application.

## Overview

The CMS system provides endpoints for managing pages, products, content blocks, and media. It includes both public endpoints for retrieving published content and admin endpoints for content management.

## Base URL

All CMS endpoints are prefixed with `/cms/`

## Public Endpoints

### Pages

#### Get Page by Slug
Retrieves a published page by its slug.

```
GET /cms/pages/{slug}
```

**Parameters:**
- `slug` (string, path): The unique slug identifier for the page

**Response:**
```json
{
  "id": 1,
  "slug": "home",
  "title": "Home",
  "subtitle": "Where elegance meets essence",
  "content": {
    "hero": {
      "title": "SERENA VENTUS",
      "subtitle": "Where elegance meets essence..."
    }
  },
  "metaTitle": "Serena Ventus - Home",
  "metaDescription": "Discover luxury fragrances...",
  "published": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### List All Pages
Retrieves all published pages.

```
GET /cms/pages
```

**Response:**
```json
{
  "pages": [
    {
      "id": 1,
      "slug": "home",
      "title": "Home",
      "subtitle": "Where elegance meets essence",
      "content": {...},
      "metaTitle": "Serena Ventus - Home",
      "metaDescription": "Discover luxury fragrances...",
      "published": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Products

#### Get Product by Slug
Retrieves a published product by its slug.

```
GET /cms/products/{slug}
```

**Parameters:**
- `slug` (string, path): The unique slug identifier for the product

**Response:**
```json
{
  "id": 1,
  "name": "AURORA",
  "slug": "aurora",
  "description": "A delicate blend of morning dew and jasmine petals",
  "longDescription": "Aurora opens with sparkling bergamot...",
  "price": 180.00,
  "size": "50ml",
  "notes": {
    "top": ["Bergamot", "Morning Dew", "Pink Grapefruit"],
    "heart": ["White Jasmine", "Lily of the Valley", "Peony"],
    "base": ["Sandalwood", "White Musk", "Blonde Woods"]
  },
  "images": ["aurora-1.jpg", "aurora-2.jpg"],
  "featured": true,
  "published": true,
  "sortOrder": 1,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### List Products
Retrieves all published products with optional filtering.

```
GET /cms/products?featured={boolean}&limit={number}
```

**Query Parameters:**
- `featured` (boolean, optional): Filter by featured products only
- `limit` (number, optional): Limit the number of results

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "AURORA",
      "slug": "aurora",
      "description": "A delicate blend of morning dew and jasmine petals",
      "longDescription": "Aurora opens with sparkling bergamot...",
      "price": 180.00,
      "size": "50ml",
      "notes": {
        "top": ["Bergamot", "Morning Dew", "Pink Grapefruit"],
        "heart": ["White Jasmine", "Lily of the Valley", "Peony"],
        "base": ["Sandalwood", "White Musk", "Blonde Woods"]
      },
      "images": ["aurora-1.jpg", "aurora-2.jpg"],
      "featured": true,
      "published": true,
      "sortOrder": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Content Blocks

#### List Content Blocks
Retrieves content blocks with optional filtering by page slug or type.

```
GET /cms/content-blocks?pageSlug={string}&type={string}
```

**Query Parameters:**
- `pageSlug` (string, optional): Filter blocks by page slug
- `type` (string, optional): Filter blocks by type

**Response:**
```json
{
  "blocks": [
    {
      "id": 1,
      "type": "hero",
      "title": "Welcome Section",
      "content": {
        "heading": "Welcome to Serena Ventus",
        "text": "Discover our collection..."
      },
      "pageSlug": "home",
      "sortOrder": 1,
      "published": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Admin Endpoints

### Pages Management

#### Create Page
Creates a new page.

```
POST /cms/admin/pages
```

**Request Body:**
```json
{
  "slug": "new-page",
  "title": "New Page",
  "subtitle": "Page subtitle",
  "content": {
    "section1": {
      "title": "Section Title",
      "content": "Section content..."
    }
  },
  "metaTitle": "New Page - Serena Ventus",
  "metaDescription": "Description for SEO",
  "published": false
}
```

**Response:** Returns the created page object (same structure as GET page response).

#### Update Page
Updates an existing page.

```
PUT /cms/admin/pages/{id}
```

**Parameters:**
- `id` (number, path): The page ID

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "subtitle": "Updated subtitle",
  "content": {
    "section1": {
      "title": "Updated Section Title",
      "content": "Updated content..."
    }
  },
  "metaTitle": "Updated Meta Title",
  "metaDescription": "Updated meta description",
  "published": true
}
```

**Response:** Returns the updated page object.

### Products Management

#### Create Product
Creates a new product.

```
POST /cms/admin/products
```

**Request Body:**
```json
{
  "name": "NEW FRAGRANCE",
  "slug": "new-fragrance",
  "description": "Short description",
  "longDescription": "Detailed description...",
  "price": 200.00,
  "size": "50ml",
  "notes": {
    "top": ["Note 1", "Note 2"],
    "heart": ["Note 3", "Note 4"],
    "base": ["Note 5", "Note 6"]
  },
  "images": ["image1.jpg", "image2.jpg"],
  "featured": false,
  "published": false,
  "sortOrder": 10
}
```

**Response:** Returns the created product object.

## Data Types

### Page Object
```typescript
interface Page {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  content: Record<string, any>;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Object
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

### Content Block Object
```typescript
interface ContentBlock {
  id: number;
  type: string;
  title?: string;
  content: Record<string, any>;
  pageSlug?: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "code": "invalid_argument",
  "message": "Invalid request parameters",
  "details": null
}
```

### 404 Not Found
```json
{
  "code": "not_found",
  "message": "Resource not found",
  "details": null
}
```

### 409 Conflict
```json
{
  "code": "already_exists",
  "message": "Resource with this identifier already exists",
  "details": null
}
```

### 500 Internal Server Error
```json
{
  "code": "internal",
  "message": "Internal server error",
  "details": null
}
```

## Usage Examples

### Frontend Integration

The CMS endpoints are automatically available in the frontend through the generated backend client:

```typescript
import backend from '~backend/client';

// Get a page
const page = await backend.cms.getPage({ slug: 'home' });

// List products
const products = await backend.cms.listProducts({ featured: true, limit: 3 });

// Get a specific product
const product = await backend.cms.getProduct({ slug: 'aurora' });

// List content blocks for a page
const blocks = await backend.cms.listContentBlocks({ pageSlug: 'home' });
```

### React Hooks

The application includes custom hooks for easier CMS integration:

```typescript
import { usePage, useProducts, useProduct, useContentBlocks } from '../hooks/useCMS';

// In a React component
function HomePage() {
  const { page, loading, error } = usePage('home');
  const { products } = useProducts(true, 3); // featured products, limit 3
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{page?.title}</h1>
      {/* Render page content */}
    </div>
  );
}
```

## Content Structure Guidelines

### Page Content
Page content is stored as flexible JSON objects. Common patterns include:

```json
{
  "hero": {
    "title": "Main Title",
    "subtitle": "Subtitle text",
    "backgroundImage": "hero-bg.jpg"
  },
  "sections": [
    {
      "type": "text",
      "title": "Section Title",
      "content": "Section content..."
    },
    {
      "type": "gallery",
      "images": ["img1.jpg", "img2.jpg"]
    }
  ]
}
```

### Product Notes Structure
Product fragrance notes follow a three-tier structure:

```json
{
  "top": ["Fresh", "Citrusy", "Light notes"],
  "heart": ["Floral", "Main character", "Body notes"],
  "base": ["Woody", "Musky", "Lasting notes"]
}
```

## Database Schema

The CMS uses the following database tables:

- `pages`: Stores page content and metadata
- `products`: Stores product information and details
- `content_blocks`: Stores reusable content blocks
- `media`: Stores media file information (planned)

All tables include automatic timestamps (`created_at`, `updated_at`) and publishing controls.
