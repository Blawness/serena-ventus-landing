import { useEffect, useMemo, useState } from 'react';
import backend from '~backend/client';
import type { Page, Product, ContentBlock } from '~backend/cms/types';

type TabKey = 'pages' | 'products' | 'blocks';

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0' }}>
      <h2 style={{ fontSize: 20, fontWeight: 600 }}>{title}</h2>
      {action}
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <div style={{ fontSize: 12, opacity: 0.8 }}>{label}</div>}
      <input {...props} style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 6, ...(props.style || {}) }} />
    </label>
  );
}

function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <div style={{ fontSize: 12, opacity: 0.8 }}>{label}</div>}
      <textarea {...props} style={{ width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 6, minHeight: 100, ...(props.style || {}) }} />
    </label>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<TabKey>('pages');

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>CMS Admin</h1>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {(['pages', 'products', 'blocks'] as TabKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: tab === k ? '#111' : '#fff',
              color: tab === k ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            {k.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        {tab === 'pages' && <PagesSection />}
        {tab === 'products' && <ProductsSection />}
        {tab === 'blocks' && <BlocksSection />}
      </div>
    </div>
  );
}

function PagesSection() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    metaTitle: '',
    metaDescription: '',
    content: '{}',
    published: false,
  });

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await backend.cms.listPages();
      setPages(res.pages ?? (res as any)); // fallback if shape differs
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const onCreate = async () => {
    try {
      const parsedContent = JSON.parse(form.content || '{}');
      await backend.cms.createPage({
        slug: form.slug,
        title: form.title,
        subtitle: form.subtitle || undefined,
        content: parsedContent,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        published: !!form.published,
      } as any);
      await fetchPages();
      alert('Page created');
    } catch (e: any) {
      alert('Create failed: ' + (e?.message ?? e));
    }
  };

  return (
    <div>
      <SectionHeader
        title="Pages"
        action={<button onClick={fetchPages} style={btnStyle}>Refresh</button>}
      />

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={cardStyle}>
        <h3 style={cardTitle}>Create Page</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input placeholder="home" label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="Home" label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Optional" label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <Input placeholder="SEO title" label="Meta Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
          <Input placeholder="SEO description" label="Meta Description" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
        </div>
        <Textarea label="Content (JSON)" placeholder='{"hero": {"title": "..."}}' value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px 0' }}>
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          <span>Published</span>
        </label>
        <button onClick={onCreate} style={btnPrimary}>Create</button>
      </div>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {pages.map((p) => (
          <div key={p.id} style={rowStyle}>
            <div>
              <div style={{ fontWeight: 600 }}>{p.title} <span style={{ opacity: 0.6 }}>({p.slug})</span></div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{p.published ? 'Published' : 'Draft'}</div>
            </div>
            <QuickPublishPage page={p} onUpdated={fetchPages} />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickPublishPage({ page, onUpdated }: { page: Page; onUpdated: () => void }) {
  const [saving, setSaving] = useState(false);
  const toggle = async () => {
    try {
      setSaving(true);
      await backend.cms.updatePage({ id: page.id, published: !page.published } as any);
      await onUpdated();
    } catch (e: any) {
      alert('Update failed: ' + (e?.message ?? e));
    } finally {
      setSaving(false);
    }
  };
  return (
    <button onClick={toggle} disabled={saving} style={btnStyle}>
      {saving ? 'Saving...' : page.published ? 'Unpublish' : 'Publish'}
    </button>
  );
}

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    price: '0',
    size: '50ml',
    description: '',
    longDescription: '',
    featured: false,
    published: false,
    sortOrder: '1',
    notesTop: '',
    notesHeart: '',
    notesBase: '',
    images: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await backend.cms.listProducts({});
      setProducts(res.products ?? (res as any));
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onCreate = async () => {
    try {
      await backend.cms.createProduct({
        name: form.name,
        slug: form.slug,
        price: parseFloat(form.price) || 0,
        size: form.size || undefined,
        description: form.description || undefined,
        longDescription: form.longDescription || undefined,
        featured: !!form.featured,
        published: !!form.published,
        sortOrder: parseInt(form.sortOrder) || 1,
        notes: {
          top: form.notesTop ? form.notesTop.split(',').map((s) => s.trim()) : [],
          heart: form.notesHeart ? form.notesHeart.split(',').map((s) => s.trim()) : [],
          base: form.notesBase ? form.notesBase.split(',').map((s) => s.trim()) : [],
        },
        images: form.images ? form.images.split(',').map((s) => s.trim()) : [],
      } as any);
      await fetchProducts();
      alert('Product created');
    } catch (e: any) {
      alert('Create failed: ' + (e?.message ?? e));
    }
  };

  return (
    <div>
      <SectionHeader
        title="Products"
        action={<button onClick={fetchProducts} style={btnStyle}>Refresh</button>}
      />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={cardStyle}>
        <h3 style={cardTitle}>Create Product</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Input label="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
          <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input label="Long Description" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
          <Input label="Notes Top (comma)" value={form.notesTop} onChange={(e) => setForm({ ...form, notesTop: e.target.value })} />
          <Input label="Notes Heart (comma)" value={form.notesHeart} onChange={(e) => setForm({ ...form, notesHeart: e.target.value })} />
          <Input label="Notes Base (comma)" value={form.notesBase} onChange={(e) => setForm({ ...form, notesBase: e.target.value })} />
          <Input label="Images (comma)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        </div>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px 0' }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          <span>Featured</span>
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px 0' }}>
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          <span>Published</span>
        </label>
        <button onClick={onCreate} style={btnPrimary}>Create</button>
      </div>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {products.map((p) => (
          <div key={p.id} style={rowStyle}>
            <div>
              <div style={{ fontWeight: 600 }}>{p.name} <span style={{ opacity: 0.6 }}>({p.slug})</span></div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{p.published ? 'Published' : 'Draft'} • ${'{'}p.price{'}'}</div>
            </div>
            <QuickFeatureProduct product={p} onUpdated={fetchProducts} />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickFeatureProduct({ product, onUpdated }: { product: Product; onUpdated: () => void }) {
  const [saving, setSaving] = useState(false);
  const toggle = async () => {
    try {
      setSaving(true);
      await backend.cms.updateProduct({ id: product.id, featured: !product.featured } as any);
      await onUpdated();
    } catch (e: any) {
      alert('Update failed: ' + (e?.message ?? e));
    } finally {
      setSaving(false);
    }
  };
  return (
    <button onClick={toggle} disabled={saving} style={btnStyle}>
      {saving ? 'Saving...' : product.featured ? 'Unfeature' : 'Feature'}
    </button>
  );
}

function BlocksSection() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({ pageSlug: '', type: '' });

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const res = await backend.cms.listContentBlocks({
        pageSlug: filters.pageSlug || undefined,
        type: filters.type || undefined,
      } as any);
      setBlocks(res.blocks ?? (res as any));
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load content blocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SectionHeader
        title="Content Blocks"
        action={<button onClick={fetchBlocks} style={btnStyle}>Refresh</button>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
        <Input label="Filter by Page Slug" value={filters.pageSlug} onChange={(e) => setFilters({ ...filters, pageSlug: e.target.value })} />
        <Input label="Filter by Type" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
        {blocks.map((b) => (
          <div key={b.id} style={rowStyle}>
            <div>
              <div style={{ fontWeight: 600 }}>{b.type} <span style={{ opacity: 0.6 }}>#{b.id}</span></div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{b.pageSlug || '(global)'} • {b.published ? 'Published' : 'Draft'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
};

const btnPrimary: React.CSSProperties = {
  ...btnStyle,
  background: '#111',
  color: '#fff',
  borderColor: '#111',
  marginTop: 8,
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #eee',
  borderRadius: 12,
  padding: 16,
  background: '#fafafa',
  marginBottom: 16,
};

const cardTitle: React.CSSProperties = { fontWeight: 700, margin: '0 0 12px' };

const rowStyle: React.CSSProperties = {
  border: '1px solid #eee',
  borderRadius: 12,
  padding: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
