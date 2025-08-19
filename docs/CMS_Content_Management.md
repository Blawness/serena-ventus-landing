# CMS Content Management Guide

This guide explains how to manage content using the CMS system, including content structure, best practices, and examples.

## Content Types

The CMS system supports several types of content:

1. **Pages** - Static pages with flexible content structure
2. **Products** - Product catalog with detailed information
3. **Content Blocks** - Reusable content components
4. **Media** - File and image management (planned)

## Pages Management

### Page Structure

Pages are the primary content type for static content like home, about, contact, etc.

#### Basic Page Fields

- **slug**: Unique URL identifier (e.g., "home", "about", "contact")
- **title**: Page title displayed in navigation and headers
- **subtitle**: Optional subtitle for additional context
- **content**: Flexible JSON structure for page content
- **metaTitle**: SEO title tag
- **metaDescription**: SEO meta description
- **published**: Whether the page is publicly visible

#### Content Structure Examples

##### Home Page
```json
{
  "hero": {
    "title": "SERENA VENTUS",
    "subtitle": "Where elegance meets essence. Discover fragrances that capture the whispers of wind and the serenity of nature."
  },
  "featured": {
    "title": "SIGNATURE COLLECTION",
    "subtitle": "Three distinct fragrances, each telling its own story"
  }
}
```

##### About Page
```json
{
  "story": {
    "title": "OUR STORY",
    "content": "Founded in 2018, Serena Ventus emerged from a passion for capturing the ephemeral beauty of nature's most delicate moments."
  },
  "values": [
    {
      "title": "SUSTAINABILITY",
      "description": "We are committed to ethical sourcing and environmental responsibility."
    },
    {
      "title": "CRAFTSMANSHIP",
      "description": "Each fragrance is meticulously crafted by master perfumers."
    }
  ]
}
```

##### Contact Page
```json
{
  "info": {
    "title": "GET IN TOUCH",
    "description": "Whether you're seeking a signature scent, have questions about our collection, or wish to schedule a private consultation, we're here to guide you."
  },
  "location": {
    "address": "123 Madison Avenue, New York, NY 10016",
    "phone": "+1 (555) 123-4567",
    "email": "hello@serenaventus.com"
  }
}
```

### Creating Pages

Use the admin API to create new pages:

```typescript
const newPage = await backend.cms.createPage({
  slug: "new-page",
  title: "New Page",
  subtitle: "Page description",
  content: {
    intro: {
      title: "Welcome",
      content: "This is a new page..."
    }
  },
  metaTitle: "New Page - Serena Ventus",
  metaDescription: "Description for search engines",
  published: false // Start as draft
});
```

### Updating Pages

Update existing pages with partial data:

```typescript
const updatedPage = await backend.cms.updatePage({
  id: 1,
  title: "Updated Title",
  content: {
    intro: {
      title: "Updated Welcome",
      content: "Updated content..."
    }
  },
  published: true // Publish the page
});
```

## Products Management

### Product Structure

Products represent the fragrance catalog with detailed information.

#### Product Fields

- **name**: Product name (e.g., "AURORA", "NOCTURNE")
- **slug**: URL-friendly identifier (e.g., "aurora", "nocturne")
- **description**: Short description for listings
- **longDescription**: Detailed description for product pages
- **price**: Product price as decimal number
- **size**: Product size (e.g., "50ml", "100ml")
- **notes**: Fragrance notes structure (top, heart, base)
- **images**: Array of image filenames
- **featured**: Whether to show in featured sections
- **published**: Whether publicly visible
- **sortOrder**: Display order (lower numbers first)

#### Fragrance Notes Structure

The notes field follows a three-tier fragrance pyramid:

```json
{
  "top": ["Bergamot", "Morning Dew", "Pink Grapefruit"],
  "heart": ["White Jasmine", "Lily of the Valley", "Peony"],
  "base": ["Sandalwood", "White Musk", "Blonde Woods"]
}
```

- **Top notes**: First impression, light and volatile
- **Heart notes**: Main character, lasting 2-4 hours
- **Base notes**: Foundation, lasting 6+ hours

### Creating Products

```typescript
const newProduct = await backend.cms.createProduct({
  name: "ETHEREAL",
  slug: "ethereal",
  description: "A mystical blend of rare florals and precious woods",
  longDescription: "Ethereal opens with delicate rose petals and morning mist, evolving into a heart of rare orchid and white tea. The base reveals precious sandalwood and soft cashmere, creating an otherworldly experience.",
  price: 220.00,
  size: "50ml",
  notes: {
    top: ["Rose Petals", "Morning Mist", "Bergamot"],
    heart: ["Rare Orchid", "White Tea", "Jasmine"],
    base: ["Sandalwood", "Cashmere", "White Musk"]
  },
  images: ["ethereal-1.jpg", "ethereal-2.jpg"],
  featured: true,
  published: false,
  sortOrder: 7
});
```

### Product Categories

While not explicitly defined in the schema, products can be categorized using:

1. **Featured status**: `featured: true` for homepage display
2. **Sort order**: Numerical ordering for display sequence
3. **Price ranges**: Group by price points
4. **Note families**: Group by dominant fragrance families

## Content Blocks

Content blocks are reusable components that can be associated with pages or used independently.

### Content Block Structure

- **type**: Block type identifier (e.g., "hero", "testimonial", "gallery")
- **title**: Optional block title
- **content**: Flexible JSON content
- **pageSlug**: Associated page (optional)
- **sortOrder**: Display order within page
- **published**: Visibility status

### Example Content Blocks

#### Hero Block
```json
{
  "type": "hero",
  "title": "Homepage Hero",
  "content": {
    "heading": "DISCOVER ELEGANCE",
    "subheading": "Luxury fragrances crafted with precision",
    "backgroundImage": "hero-bg.jpg",
    "ctaText": "EXPLORE COLLECTION",
    "ctaLink": "/collection"
  },
  "pageSlug": "home",
  "sortOrder": 1
}
```

#### Testimonial Block
```json
{
  "type": "testimonial",
  "title": "Customer Review",
  "content": {
    "quote": "Aurora has become my signature scent. The delicate balance of jasmine and sandalwood is simply divine.",
    "author": "Sarah M.",
    "location": "New York",
    "rating": 5
  },
  "pageSlug": "home",
  "sortOrder": 3
}
```

#### Gallery Block
```json
{
  "type": "gallery",
  "title": "Product Gallery",
  "content": {
    "images": [
      {
        "src": "gallery-1.jpg",
        "alt": "Serena Ventus boutique interior",
        "caption": "Our flagship boutique in Manhattan"
      },
      {
        "src": "gallery-2.jpg",
        "alt": "Fragrance bottles",
        "caption": "Handcrafted bottles with attention to detail"
      }
    ]
  },
  "pageSlug": "about",
  "sortOrder": 2
}
```

## Content Best Practices

### 1. SEO Optimization

Always include meta information:

```typescript
{
  title: "About Serena Ventus",
  metaTitle: "About Us - Serena Ventus Luxury Fragrances",
  metaDescription: "Discover the story behind Serena Ventus, our commitment to craftsmanship, and the art of creating exceptional fragrances."
}
```

### 2. Content Structure

Keep content modular and reusable:

```json
{
  "sections": [
    {
      "type": "intro",
      "title": "Welcome",
      "content": "Introduction text..."
    },
    {
      "type": "features",
      "items": [
        {
          "title": "Feature 1",
          "description": "Feature description..."
        }
      ]
    }
  ]
}
```

### 3. Image Management

Use consistent naming conventions:

```
product-name-angle.jpg
aurora-front.jpg
aurora-side.jpg
aurora-detail.jpg
```

### 4. Slug Conventions

Use lowercase, hyphenated slugs:

```
✅ Good: "about-us", "signature-collection", "contact-info"
❌ Avoid: "About_Us", "signatureCollection", "Contact Info"
```

### 5. Content Versioning

When updating content, consider:

1. Save as draft first (`published: false`)
2. Review content thoroughly
3. Test on staging environment
4. Publish when ready (`published: true`)

## Content Workflow

### 1. Planning Phase
- Define page structure and content requirements
- Plan product information and categorization
- Design content block templates

### 2. Creation Phase
- Create pages with basic structure
- Add products with complete information
- Build reusable content blocks

### 3. Review Phase
- Check content for accuracy and consistency
- Verify SEO metadata
- Test responsive design

### 4. Publishing Phase
- Set `published: true` for ready content
- Monitor for any issues
- Update as needed

## Content Examples

### Complete Product Example

```typescript
{
  name: "SOLSTICE",
  slug: "solstice",
  description: "A warm embrace of golden hour, where earth meets sky",
  longDescription: "Solstice captures the magic of the longest day with warm spices and golden florals. Opening with cardamom and orange blossom, it reveals a heart of tuberose and ylang-ylang, grounded by a base of sandalwood, benzoin, and soft vanilla.",
  price: 210.00,
  size: "50ml",
  notes: {
    top: ["Cardamom", "Orange Blossom", "Mandarin"],
    heart: ["Tuberose", "Ylang-Ylang", "Magnolia"],
    base: ["Sandalwood", "Benzoin", "Soft Vanilla"]
  },
  images: ["solstice-bottle.jpg", "solstice-lifestyle.jpg"],
  featured: false,
  published: true,
  sortOrder: 4
}
```

### Complete Page Example

```typescript
{
  slug: "collection",
  title: "Collection",
  subtitle: "Discover our signature fragrances",
  content: {
    intro: {
      title: "SIGNATURE FRAGRANCES",
      subtitle: "Six distinct compositions, each capturing a different facet of nature's beauty"
    },
    philosophy: {
      title: "OUR PHILOSOPHY",
      content: "Each fragrance in our collection represents a different moment in nature's eternal dance. From the gentle awakening of Aurora to the powerful energy of Tempest, we capture the full spectrum of natural beauty in crystalline clarity."
    }
  },
  metaTitle: "Fragrance Collection - Serena Ventus",
  metaDescription: "Explore our signature fragrance collection featuring Aurora, Nocturne, Zephyr, Solstice, Tempest, and Reverie. Each scent tells a unique story of elegance and sophistication.",
  published: true
}
```

This comprehensive guide provides everything needed to effectively manage content in the CMS system while maintaining consistency and quality.
