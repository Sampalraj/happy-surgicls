-- ============================================================================
-- HAPPY SURGICALS - PRICE COLUMN FIX
-- ============================================================================
-- The error "Could not find the 'price' column" indicates this column is missing.
-- This script adds it and reloads the schema cache.
-- ============================================================================

-- 1. Add 'price' column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price TEXT; 
-- Note: Using TEXT for flexibility as per typical simple implementations, 
-- but ideally NUMERIC. If you prefer numeric, change to: NUMERIC(10, 2)
-- For now, matching the likely form input which sends a string/number mixed.

-- 2. Force Schema Cache Reload (Supabase specific)
NOTIFY pgrst, 'reload config';

-- 3. Verify it exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'price';
