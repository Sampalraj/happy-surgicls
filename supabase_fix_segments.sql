-- ============================================================================
-- HAPPY SURGICALS - SEGMENTS SCHEMA FIX
-- ============================================================================
-- The error 400 on updating segments indicates missing columns.
-- This script adds the columns expected by the 'SegmentManager.jsx' frontend.
-- ============================================================================

-- 1. Add missing columns to 'segments' table
ALTER TABLE public.segments ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE public.segments ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.segments ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.segments ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 2. Force Schema Cache Reload
NOTIFY pgrst, 'reload config';

-- 3. Verify columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'segments';
