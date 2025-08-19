CREATE TABLE content_blocks (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  content JSONB NOT NULL DEFAULT '{}',
  page_slug VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_content_blocks_page_slug ON content_blocks(page_slug);
CREATE INDEX idx_content_blocks_type ON content_blocks(type);
CREATE INDEX idx_content_blocks_published ON content_blocks(published);
CREATE INDEX idx_content_blocks_sort_order ON content_blocks(sort_order);
