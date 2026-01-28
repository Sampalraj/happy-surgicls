-- Create the 'pages' table to store dynamic page content
CREATE TABLE IF NOT EXISTS public.pages (
    slug TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (idempotent)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid "already exists" errors
DROP POLICY IF EXISTS "Public pages are viewable by everyone" ON public.pages;
DROP POLICY IF EXISTS "Admins can insert/update pages" ON public.pages;

-- Re-create Policy: Anyone can read page content (for public website)
CREATE POLICY "Public pages are viewable by everyone"
ON public.pages FOR SELECT
USING (true);

-- Re-create Policy: Only authenticated users (admins) can update/insert page content
CREATE POLICY "Admins can insert/update pages"
ON public.pages FOR ALL
USING (auth.role() = 'authenticated');

-- Insert default rows if they don't exist
INSERT INTO public.pages (slug, content)
VALUES
    ('home', '{"heroTitle": "Happy Surgicals", "heroSubtitle": "Leading Manufacturer of Quality Medical Supplies"}'),
    ('about', '{"title": "About Us", "content": "Our story begins..."}'),
    ('contact', '{"title": "Contact Us", "contactInfo": {"email": "info@happysurgicals.com"}}')
ON CONFLICT (slug) DO NOTHING;

-- Force schema cache reload (usually automatic, but good to trigger)
NOTIFY pgrst, 'reload config';
