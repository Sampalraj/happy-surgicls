-- ============================================================================
-- HAPPY SURGICALS - GENERAL CLEANUP & SCHEMA FIX
-- ============================================================================
-- This script proactively fixes missing columns in 'categories' and 'certificates'
-- tables to prevent 400 Bad Request errors in the Admin Panel.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ----------------------------------------------------------------------------
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
-- Ensure segment_id exists (it typically does, but good to check)
-- Note: If it doesn't exist, we need to know the type. Usually UUID or INT. 
-- Assuming it exists or was created by initial migration.

-- ----------------------------------------------------------------------------
-- 2. CERTIFICATES TABLE
-- ----------------------------------------------------------------------------
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS issuer TEXT;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS expiry DATE; -- or TEXT
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS show_on_products BOOLEAN DEFAULT true;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN DEFAULT false;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS category_ids JSONB DEFAULT '[]'::jsonb; 

-- ----------------------------------------------------------------------------
-- 3. REFRESH CACHE
-- ----------------------------------------------------------------------------
NOTIFY pgrst, 'reload config';

-- 4. Verify
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('categories', 'certificates')
ORDER BY table_name, column_name;
