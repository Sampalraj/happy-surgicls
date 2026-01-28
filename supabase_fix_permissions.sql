-- 1. Explicitly Grant Table Permissions (Standard Postgres Privileges)
-- This is often the missing piece for 401 errors even if RLS is correct.
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT ALL ON TABLE public.enquiries TO anon;
GRANT ALL ON TABLE public.enquiries TO authenticated;
GRANT ALL ON TABLE public.enquiries TO service_role;

-- 2. Force Enable RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 3. Reset Policies (Bulletproof Re-creation)
DROP POLICY IF EXISTS "Allow public to insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Enable insert for all" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins to view enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admins to update enquiries" ON public.enquiries;

-- Policy: Allow ANYONE (anon + authenticated) to insert
CREATE POLICY "Enable insert for all"
ON public.enquiries
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow Only Authenticated (Admins) to View
CREATE POLICY "Allow admins to view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow Only Authenticated (Admins) to Update
CREATE POLICY "Allow admins to update enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (true);
