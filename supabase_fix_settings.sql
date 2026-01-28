-- Create the 'settings' table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.settings (
    id BIGINT PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),   
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT ensure_single_row CHECK (id = 1) -- Optional: ensure only one row if desired, but mostly just convention
);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid "already exists" errors
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;

-- Policy: Everyone can read settings (needed for footer, logo etc on public site)
CREATE POLICY "Settings are viewable by everyone"
ON public.settings FOR SELECT
USING (true);

-- Policy: Only admins can update
CREATE POLICY "Admins can update settings"
ON public.settings FOR UPDATE
USING (auth.role() = 'authenticated');

-- Insert default row if it doesn't exist
INSERT INTO public.settings (id, data)
VALUES (1, '{
    "siteName": "Happy Surgicals",
    "email": "info@happysurgicals.com",
    "socials": {}
}'::jsonb)
ON CONFLICT (id) DO NOTHING;
