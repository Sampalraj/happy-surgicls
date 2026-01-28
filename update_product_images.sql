-- Bulk update for products with missing images
-- Uses a professional surgical tools/medical setup image as fallback
-- Target: Rows where img column is NULL or empty string

UPDATE public.products
SET img = 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
WHERE img IS NULL OR img = '';
