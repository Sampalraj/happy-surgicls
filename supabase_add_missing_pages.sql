-- Insert missing page rows for Manufacturing and Services to prevent 406 errors in Admin
-- These pages were previously hardcoded in frontend but need DB rows for Admin editing.

INSERT INTO public.pages (slug, content)
VALUES
    (
        'manufacturing',
        '{
            "title": "Manufacturing Excellence",
            "subtitle": "State-of-the-art facility",
            "content": "Our state-of-the-art manufacturing facility operates under strict ISO 13485:2016 and GMP guidelines. We combine advanced automation with skilled craftsmanship.",
            "facilities": [
                {"title": "Clean Rooms", "desc": "ISO Class 8 clean rooms for sterile assembly."},
                {"title": "Injection Molding", "desc": "High-precision molding for consistent component quality."},
                {"title": "QA Labs", "desc": "Advanced testing equipment for material and product validation."}
            ]
        }'::jsonb
    ),
    (
        'services',
        '{
            "title": "Our Services",
            "subtitle": "Comprehensive healthcare solutions",
            "items": [
                {"title": "Medical Equipment Rental", "desc": "High-end medical equipment on flexible rental terms."},
                {"title": "Bulk Supply", "desc": "End-to-end procurement solutions for large institutions."},
                {"title": "Partnership Program", "desc": "Authorized dealer and distributor network support."}
            ]
        }'::jsonb
    )
ON CONFLICT (slug) DO UPDATE
SET content = EXCLUDED.content
WHERE public.pages.content = '{}'::jsonb; -- Only update if content is empty default
